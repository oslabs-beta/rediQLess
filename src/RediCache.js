class RediCache {
  constructor(QLQueryObj, redisClient, QLResponse = {}) {
    // REQUESTED FIELDS THAT ARE NOT FOUND IN THE CACHE ARE PUSHED INTO THIS ARRAY
    this.redisFields = [];

    // INITIALLY THE RAW QUERY BEING MADE, THEN IT WILL BE REDEFINED AS AN OBJECT OF FIELDS/TYPES
    this.QLQueryObj = QLQueryObj;

    // WILL STORE THE NEXT NESTED QUERY TO RECURSIVELY TAKE PLACE OF QLQUERY OBJ
    this.nextType = [];

    // THE RESPONSE RECEIVED FROM GQL REQUEST
    this.QLResponse = QLResponse;

    // IF REDISFIELDS IS EMPTY, WE FORM A NEW RESPONSE FROM CACHE
    this.newResponse = {};

    // THE ACTUAL REDIS CLIENT
    this.redisClient = redisClient;

    // INITIALIZED AS FALSE, IF FALSE, THE INFORMATION DOES NOT EXIST YET IN THE CACHE
    this.rediResponse = false;

    // AN ARRAY OF THE UNIQUE ID'S BASED ON FIELD 1 OF EACH TYPE
    this.keyIndex;

    this.exactQuery = false;

    this.rawQuery;
  }

  /// ASYNCRONOUS METHOD WHICH CHECKS TO SEE IF A KEYINDEX EXISTS
  async createQuery() {
    // INSTANTIATE ARGSID AND ARGS
    let argsId;
    let args;
    this.rawQuery = JSON.stringify(this.QLQueryObj);
    this.exactQuery = await this.checkRedis(this.rawQuery);
    if (this.exactQuery > 0) {
      this.rediResponse = true;
      return (this.newResponse = await this.getFromRedis(this.rawQuery));
    }
    // USING REDIS FUNCTION TO SEE IF KEYINDEX EXISTS -   IF IT DOESNT, ASSIGNE TO AN EMPTY ARRAY
    this.keyIndex = JSON.parse(await this.getFromRedis("keyIndex")) || [];

    // QUERY TYPES IS LOCATING THE FIRST TYPE IN THE QUERY
    const types =
      this.QLQueryObj["definitions"][0].selectionSet.selections[0].name.value;

    // ESTABLISHES AN ARRAY OF FIELD OBJECTS
    const fields =
      this.QLQueryObj["definitions"][0].selectionSet.selections[0].selectionSet
        .selections;
    // IF ARGUMENTS ID AND ARGUMENTS ARE DEFINED IN QUERY AST, ASSIGN THEM TO ARGSID AND ARGS
    if (
      this.QLQueryObj["definitions"][0].selectionSet.selections[0]
        .arguments[0] !== undefined
    ) {
      argsId =
        this.QLQueryObj["definitions"][0].selectionSet.selections[0]
          .arguments[0].name.value;
      args =
        this.QLQueryObj["definitions"][0].selectionSet.selections[0]
          .arguments[0].value.value;
    }

    // INSTANTIATE NEXTTYPE
    let nextType;

    // CHECKS TO SEE IF THE NEXTTYPE IN THE QUERY IS NESTED (OR IF IT EXISTS)
    const fieldsArr = fields.map((field) => {
      // CHECKS TO SEE IF SELECTIONSET IS UNDEFINED (ARRAY OF FIELDS) IF IT IS, NEXTTYPE GETS REASSIGNED TO THE FILED OF FIELDSOBK
      if (field.selectionSet !== undefined) nextType = field;
      //RETURN FIELD.NAME.VALUE
      return field.name.value;
    });

    // IF WE DISCOVERED A NESTED TYPE, THEN THIS.NEXTTYPE GETS PASED INTO NEXTED QUERY
    if (nextType) this.nextType = await this.nestedQuery(nextType);

    // redis fields will check the fields arr and return only fields that don't have existing keys in redis
    // REDIS FIELDS WILL  CHECK

    // THIS IS GOING TO THE FIELDS ARRAY AND CHECKING REDIS WITH THE FIELDS-ID
    if (this.keyIndex) {
      for (let i = 0; i < fieldsArr.length; i++) {
        // IF FIELDSARR[i] IS NOT EQUAL TO NEXTTYPE, THEN WE CHECK FOR IT IN REDIS
        if (fieldsArr[i] !== this.nextType.types) {
          let exists;
          if (args) {
            exists = await this.checkRedis(`${fieldsArr[i]} ${args}`);
          } else {
            exists = await this.checkRedis(
              // **POTENTIAL OPTIMIZATION POINT [0]
              `${fieldsArr[i]} ${this.keyIndex[0]}`
            );
            // IF IT DOESNT EXIST IN THE CACHE, PUSH IT TO THE FIELDSARR AND THE INDEX
          }
          if (!exists) {
            this.redisFields.push(fieldsArr[i]);
            break;
          }
        }
      }
    }

    // IF REDISFIELDS LENGTH IS ZERO, AND KEYINDEX IS TRUE - ALL THE VALUES IN QUERY WERE FOUND IN THE CACHE
    if (this.redisFields.length == 0 && this.keyIndex) this.rediResponse = true;

    // INSTANTIATE AS NULL
    let argsAndId = null;

    //IF ARGS IS UNDEFINED, DESTRUCTURE ARGS ID AND ARGS TOGETHER
    if (args !== undefined) argsAndId = [argsId, args];

    this.QLQueryObj = {
      types: [types],
      fieldsArr: fieldsArr,
      arguments: argsAndId, // --> [argsId, args]
    };

    // IF THE NEXTTYPE IS AN OBJ, SAVE IT TO REDIS
    if (typeof this.nextType == "object")
      this.redisClient.setex("nextType", 3600, JSON.stringify(this.nextType));

    // IF ALL ALL VALUES WERE FOUND IN REDIS, INVOKE CREATE RESPONSE
    if (this.rediResponse) await this.createResponse();
  }
  // <--- END OF CREATEQUERY ---> //

  // CREATE RESPONSE CREATES THE REDIS RESPONSE
  async createResponse() {
    // CREATE KEY/VALUE PAIR IN EMPTY NEWRESPONSE OBJ
    this.newResponse[`${this.QLQueryObj.types}`] = [];

    //IF A RESPONSE BY ID IS REQUESTED (BY WAY OF SINGLE VALUE REQUEST)
    if (this.QLQueryObj.arguments) {
      this.newResponse[`${this.QLQueryObj.types}`][0] = {};
      //LOOPS THROUGH QL QUERY OBJ
      for (let i = 0; i < this.QLQueryObj.fieldsArr.length; i++) {
        // IF THE QLQUERYOBJ AT I HAS A NESTED TYPE...
        if (this.QLQueryObj.fieldsArr[i] === this.nextType.types) {
          // PROCESS THE NESTED RESPONSE
          this.newResponse[`${this.QLQueryObj.types}`][0][this.nextType.types] =
            {};
          // CREATE NESTED RESPONSE VIA NESTEDCREATE METHOD
          await this.nestedCreate(0);
        } else {
          // NO NESTED TYPE DETECTED

          // REFERENCE KEY TO OBTAIN KEY FROM CACHE
          const keyReference =
            `${this.QLQueryObj.fieldsArr[i]}` +
            ` ${this.QLQueryObj.arguments[1]}`;

          // REDIRESPONSE SET TO OBTAINING THE INFO VIA KEYREFERENCE FROM REDIS
          let redisResponse = await this.getFromRedis(keyReference);

          // *TYPE CONVERSION*
          //convert number string into number type
          //isNaN checking to see if redisResponse is a number-string
          if (!isNaN(+redisResponse)) redisResponse = Number(redisResponse);
          //convert boolean strings to booleans
          if (redisResponse === "true") redisResponse = true;
          if (redisResponse === "false") redisResponse = false;

          this.newResponse[`${this.QLQueryObj.types}`][0][
            `${this.QLQueryObj.fieldsArr[i]}`
          ] = redisResponse;
        }
      }

      // ELSE: IF NO ARGUMENTS WERE DETECTED
    } else {
      //STORE ARRAY OF IDS IN REDIS WITH KEY OF KEYINDEX IN CACHERESP
      this.keyIndex = JSON.parse(await this.getFromRedis("keyIndex"));

      // LOOP THROUGH KEYINDEX (AMOUNT OF DATA FROM INITIAL RESP IN REDIS)
      for (let j = 0; j < this.keyIndex.length; j++) {
        // J IS THE AMMT OF RESPONSES
        this.newResponse[`${this.QLQueryObj.types}`][j] = {};
        //loops through graphQL response, caching the values as "`${fieldname + id}` : value". In this case the id is flight_number.
        for (let i = 0; i < this.QLQueryObj.fieldsArr.length; i++) {
          // I IS EACH INDIVIDUAL PIECE OF DATA

          // IF THE NEXT TYPE IS TYPES, WE ARE NESTED - PERFORM LOGIC
          if (this.QLQueryObj.fieldsArr[i] === this.nextType.types) {
            this.newResponse[`${this.QLQueryObj.types}`][j][
              this.nextType.types
            ] = {};
            await this.nestedCreate(j);
          } else {
            // <---- NEED TO WORK ON MAKING THIS CODE DRY AS IT LEVERAGED A FEW TIMES ----> //

            // WE ARE NOT NESTED
            const keyReference =
              `${this.QLQueryObj.fieldsArr[i]}` + ` ${this.keyIndex[j]}`;

            let redisResponse = await this.getFromRedis(keyReference);
            //convert number string into number type
            //isNaN checking to see if redisResponse is a number-string
            if (!isNaN(+redisResponse)) redisResponse = Number(redisResponse);
            //convert boolean strings to booleans
            if (redisResponse === "true") redisResponse = true;
            if (redisResponse === "false") redisResponse = false;

            this.newResponse[`${this.QLQueryObj.types}`][j][
              `${this.QLQueryObj.fieldsArr[i]}`
            ] = redisResponse;
          }
        }
      }
    }
    this.redisClient.setex(
      this.rawQuery,
      3600,
      JSON.stringify(this.QLResponse)
    );
  }

  // <---------------------------------------------->

  // LOGIC INVOKES NESTEDQUERY IF WE HAVE A NESTED QUERY
  async nestedQuery(field) {
    const queryType = field.name.value;
    const fields = field.selectionSet.selections;

    const fieldsArr = fields.map((field) => {
      if (field.selectionSet !== undefined) {
        // this.nestedQuery(field)
        this.nextType = this.nestedQuery(field);
      }
      return field.name.value;
    });

    // REDIS FIELDS WILL CHECK THE FIELDS ARR AND RETURN ONLY FIELDS THAT DON'T HAVE EXISTING KEYS IN REDIS

    for (let i = 0; i < fieldsArr.length; i++) {
      let exists = await this.checkRedis(`${fieldsArr[i]} ${this.keyIndex[0]}`);
      if (!exists) {
        this.redisFields.push(fieldsArr[i]);
        break;
      }
    }

    const QLQueryObj = {
      types: queryType,
      fieldsArr: fieldsArr,
    };
    return QLQueryObj;
  }

  async nestedCreate(j) {
    for (let i = 0; i < this.nextType.fieldsArr.length; i++) {
      const keyReference =
        `${this.nextType.fieldsArr[i]}` + ` ${this.keyIndex[j]}`;

      let redisResponse = await this.getFromRedis(keyReference);
      //convert number string into number type
      //isNaN checking to see if redisResponse is a number-string
      if (!isNaN(+redisResponse)) redisResponse = Number(redisResponse);
      //convert boolean strings to booleans
      if (redisResponse === "true") redisResponse = true;
      if (redisResponse === "false") redisResponse = false;

      this.newResponse[`${this.QLQueryObj.types}`][j][this.nextType.types][
        this.nextType.fieldsArr[i]
      ] = redisResponse;
    }
  }
  // CACHERESPONSE: TAKES DATE FROM THE API REPONSE (AFTER QUERY) AND SAVES TO REDIS
  async cacheResponse() {
    this.keyIndex = [];
    //send request from createQuery
    //keyExists checks Redis for the given key
    let keyExists = false;

    //given a unique value (in the demo it is flight_number)
    //the corresponding values could be cached with that unique value concatenated for the key value.

    this.newResponse[`${this.QLQueryObj.types}`] = [];
    //j will iterate through array of objects in response. In this case each launch.

    for (let j = 0; j < this.QLResponse[this.QLQueryObj.types].length; j++) {
      //push key into array for later reference.
      this.keyIndex.push(
        this.QLResponse[this.QLQueryObj.types][j][this.QLQueryObj.fieldsArr[0]]
      );
      this.newResponse[`${this.QLQueryObj.types}`][j] = {};
      //loops through graphQL response, caching the values as "`${fieldname + id}` : value". In this case the id is flight_number.

      for (let i = 0; i < this.QLQueryObj.fieldsArr.length; i++) {
        if (this.QLQueryObj.fieldsArr[i] === this.nextType.types) {
          await this.nestedResponse(
            this.QLResponse[this.QLQueryObj.types[0]][j][
              this.QLQueryObj.fieldsArr[i]
            ],
            j,
            i
          );
          continue;
        }
        const redisKey =
          `${this.QLQueryObj.fieldsArr[i]}` +
          ` ${
            this.QLResponse[this.QLQueryObj.types][j][
              this.QLQueryObj.fieldsArr[0]
            ]
          }`;

        const value = `${
          this.QLResponse[this.QLQueryObj.types][j][
            this.QLQueryObj.fieldsArr[i]
          ]
        }`;

        this.redisClient.setex(redisKey, 3600, value);
      }
      //save keyIndex array into redis
      this.redisClient.setex("keyIndex", 3600, JSON.stringify(this.keyIndex));

      this.redisClient.setex(
        this.rawQuery,
        3600,
        JSON.stringify(this.QLResponse)
      );
    }
  }
  // if cacheResponse finds nested object nestedResponse caches those nested values
  async nestedResponse(nestedResponse, j, h) {
    //loops through graphQL response, caching the values as "`${fieldname + id}` : value". In this case the id is flight_number.
    for (let i = 0; i < this.nextType.fieldsArr.length; i++) {
      const redisKey =
        `${this.nextType.fieldsArr[i]}` +
        ` ${
          this.QLResponse[this.QLQueryObj.types][j][
            this.QLQueryObj.fieldsArr[0]
          ]
        }`;
      const value = `${nestedResponse[this.nextType.fieldsArr[i]]}`;

      this.redisClient.setex(redisKey, 3600, value);
    }
  }

  checkRedis(key) {
    return new Promise((resolve, reject) => {
      this.redisClient.exists(key, (err, exists) => {
        err ? reject(err) : resolve(exists);
      });
    });
  }

  getFromRedis(key) {
    const redisResponse = new Promise((resolve, reject) => {
      this.redisClient.get(key, (error, result) =>
        error ? reject(error) : resolve(result)
      );
    });
    //convert number string into number type
    //isNaN checking to see if redisResponse is a number-string
    if (!isNaN(+redisResponse)) redisResponse = Number(redisResponse);
    //convert boolean strings to booleans
    if (redisResponse === "true") redisResponse = true;
    if (redisResponse === "false") redisResponse = false;
    return redisResponse;
  }
}

module.exports = RediCache;
