
class ExpCache {
  constructor(QLQueryObj, redisClient, QLResponse = {} ) {
    this.createQuery = this.createQuery.bind(this)
    this.cacheResponse = this.cacheResponse.bind(this)
    this.checkRedis = this.checkRedis.bind(this)
    this.getFromRedis = this.getFromRedis.bind(this)
    this.createResponse = this.createResponse.bind(this)
    this.nestedQuery = this.nestedQuery.bind(this)
    this.nestedCreate = this.nestedCreate.bind(this)
    this.indexStore = this.indexStore.bind(this)
    this.redisFields = []
    this.QLQueryObj = QLQueryObj
    this.nextType = []
    this.QLResponse = QLResponse
    this.newResponse = {}
    this.redisClient = redisClient
    this.rediResponse = false
    this.keyIndex = []
    this.store = this.indexStore()
    
  }
  indexStore() {
    let arr;
    function store() {
      if(arr == undefined) arr = this.keyIndex
      return arr
    }
    store
  }
  async createQuery() {
    
    //create query will check what fields already exist in the cache and return a new query with only uncached information
    //cacheResponse will use this query to navigate the query and cache the response

    console.log(
      'parsed query, drilled to first query type => ',
      this.QLQueryObj['definitions'][0].selectionSet.selections[0].name.value
    )
    //if a selection in a selection set does not have a "selectionSet" key,
    //it can be assumed to be a type, and not a field (i.e. Nested graphQL querys.)

    //a way of handling nested queries still needs to be addressed.

    console.log(
      'parsed query, drilled to first query field => ',
      this.QLQueryObj['definitions'][0].selectionSet.selections[0].selectionSet
        .selections[0].name.value
    )
    console.log('parsed query, drilled to nested query => ', this.QLQueryObj['definitions'][0].selectionSet.selections[0].selectionSet
    .selections[4])
    // console.log('fields length => ', this.QLQueryObj['definitions'][0].selectionSet.selections[0].selectionSet.selections.length)

    const queryTypes =
      this.QLQueryObj['definitions'][0].selectionSet.selections[0].name.value

    const fieldsObj =
      this.QLQueryObj['definitions'][0].selectionSet.selections[0].selectionSet
        .selections


    let nextType    
    const fieldsArr = fieldsObj.map((field) => { 
      if(field.selectionSet !== undefined) {
        // this.nestedQuery(field)
       nextType = field
        return field.name.value
      }
      return field.name.value
    })
    if(nextType !== undefined) this.nextType = await this.nestedQuery(nextType)
    
    // redis fields will check the fields arr and return only fields that don't have existing keys in redis
    
    for (let i = 0; i < fieldsArr.length; i++) {
      if(fieldsArr[i] !== this.nextType.types){
      let exists = await this.checkRedis(`${fieldsArr[i]} 1`)
      if (!exists) {
        
        this.redisFields.push(fieldsArr[i])
      }
    }
    }
    if(this.redisFields.length == 0) this.rediResponse = true

    console.log('this.redisFields Array => ', this.redisFields)
    this.QLQueryObj = {
      types: [queryTypes],
      fieldsArr: fieldsArr,
    }
    console.log('this.QLQueryObj =>', this.QLQueryObj)
   if(this.rediResponse) await this.createResponse()
  }

  async createResponse(){
    this.newResponse[`${this.QLQueryObj.types}`] = []
    for (let j = 1; j < 50; j++) { 
      this.newResponse[`${this.QLQueryObj.types}`][j] = {}
      //loops through graphQL response, caching the values as "`${fieldname + id}` : value". In this case the id is flight_number.
      for (let i = 1; i < this.QLQueryObj.fieldsArr.length; i++) {
        if (this.QLQueryObj.fieldsArr[i] === this.nextType.types) {
          this.newResponse[`${this.QLQueryObj.types}`][j][this.nextType.types] = {} 
          await this.nestedCreate(j)
        }
        else {
        const redisKey =
          `${this.QLQueryObj.fieldsArr[i]}` +
          ` ${j}` 
         
         
          let redisResponse = await this.getFromRedis(redisKey)
          //convert number string into number type
          //isNaN checking to see if redisResponse is a number-string
          if (!isNaN(+redisResponse)) redisResponse = Number(redisResponse)
          //convert boolean strings to booleans 
          if (redisResponse === 'true') redisResponse = true
          if (redisResponse === 'false') redisResponse = false

          this.newResponse[`${this.QLQueryObj.types}`][j][
            `${this.QLQueryObj.fieldsArr[i]}`
          ] = redisResponse
      }
      // console.log(this.newResponse)
    }
  }
}
  async nestedQuery(field) {
    const queryType =
    field.name.value

  const fieldsObj =
    field.selectionSet.selections
 
    const fieldsArr = fieldsObj.map((field) => { 
      console.log(field.name.value)
      if(field.selectionSet !== undefined) {
        // this.nestedQuery(field)
        this.nextType = this.nestedQuery(field)
        return field.name.value
      }
      return field.name.value
    })

    console.log('nextType ', this.nextType)
    console.log('fieldsArr', fieldsArr)
    // redis fields will check the fields arr and return only fields that don't have existing keys in redis
    
    for (let i = 0; i < fieldsArr.length; i++) {
      let exists = await this.checkRedis(`${fieldsArr[i]} 1`)
      if (!exists) {
        this.redisFields.push(fieldsArr[i])
      }
    }

      const QLQueryObj = {
        types: queryType,
        fieldsArr: fieldsArr,
      }
      return QLQueryObj
  }
  
  async nestedCreate(j){
    for (let i = 0; i < this.nextType.fieldsArr.length; i++) {
     
      const redisKey =
        `${this.nextType.fieldsArr[i]}` +
        ` ${j}`
      
        let redisResponse = await this.getFromRedis(redisKey)
        //convert number string into number type
        //isNaN checking to see if redisResponse is a number-string
        if (!isNaN(+redisResponse)) redisResponse = Number(redisResponse)
        //convert boolean strings to booleans
        if (redisResponse === 'true') redisResponse = true
        if (redisResponse === 'false') redisResponse = false

        this.newResponse[`${this.QLQueryObj.types}`][j][
          this.nextType.types][
            this.nextType.fieldsArr[i]] = redisResponse
    } 
  }
  // CACHERESPONSE: TAKES DATE FROM THE API REPONSE (AFTER QUERY) AND SAVES TO REDIS
  async cacheResponse() {
    //send request from createQuery
    //keyExists checks Redis for the given key
    let keyExists = false

    console.log('reconstructed query from createQuery => ', this.QLQueryObj)

    // console.log('first three values of response to reduce console clutter')
    // for (let i = 0; i < 3; i++) {
    //   console.log(this.QLResponse[this.QLQueryObj.types][i])
    // }

    //given a unique value (in this example it is flight_number)
    //the corresponding values could be cached with that unique value concatenated for the key value.
    // console.log(this.QLResponse)
    this.newResponse[`${this.QLQueryObj.types}`] = []
    //j will iterate through array of objects in response. In this case each launch.
    for (let j = 0; j < this.QLResponse[this.QLQueryObj.types].length; j++) {
      //push key into array for later reference.
      this.keyIndex.push(this.QLResponse[this.QLQueryObj.types][j][
        this.QLQueryObj.fieldsArr[0]
      ])
      this.newResponse[`${this.QLQueryObj.types}`][j] = {}
      //loops through graphQL response, caching the values as "`${fieldname + id}` : value". In this case the id is flight_number.
     
      for (let i = 0; i < this.QLQueryObj.fieldsArr.length; i++) {
        
        // console.log('cache response', this.QLResponse[this.QLQueryObj.types][j])
        if(this.QLQueryObj.fieldsArr[i] === this.nextType.types) {
          
          this.nestedResponse(this.QLResponse[this.QLQueryObj.types[0]][j][this.QLQueryObj.fieldsArr[i]], this.QLQueryObj.fieldsArr[i], j, i)  
          continue
        }
        const redisKey =
          `${this.QLQueryObj.fieldsArr[i]}` +
          ` ${
            this.QLResponse[this.QLQueryObj.types][j][
              this.QLQueryObj.fieldsArr[0]
            ]
          }`
          
        const value = `${
          this.QLResponse[this.QLQueryObj.types][j][
            this.QLQueryObj.fieldsArr[i]
          ]
        }`

        keyExists = await this.checkRedis(redisKey)
        if (!keyExists) {
          this.redisClient.setex(redisKey, 3600, value)
        } else {
          let redisResponse = await this.getFromRedis(redisKey)
          //convert number string into number type
          if (!isNaN(+redisResponse)) redisResponse = Number(redisResponse)
          //convert boolean strings to booleans
          if (redisResponse === 'true') redisResponse = true
          if (redisResponse === 'false') redisResponse = false

          this.newResponse[`${this.QLQueryObj.types}`][j][
            `${this.QLQueryObj.fieldsArr[i]}`
          ] = redisResponse
        }
      }
      
    }
   
    let firstThree = []

    for (let i = 0; i < 3; i++) {
      //COMING FROM REDIS CACHE - TESTING HOW DATA GETS RETURNED
      firstThree.push(this.newResponse[this.QLQueryObj.types][i])
    }
    console.log('new response from values from cache(first 3)', firstThree) 
  }
// if cacheResponse finds nested object nestedResponse caches those nested values
  async nestedResponse(nestedResponse, queryObj , j, h) {
    // console.log('nestedResponse args')
    // console.log(`${JSON.stringify(nestedResponse)}, ${queryObj}, ${j}`)
 
  
      //loops through graphQL response, caching the values as "`${fieldname + id}` : value". In this case the id is flight_number.
      for (let i = 0; i < this.nextType.fieldsArr.length; i++) {
        const redisKey =
          `${this.nextType.fieldsArr[i]}` +
          ` ${
            this.QLResponse[this.QLQueryObj.types][j][
              this.QLQueryObj.fieldsArr[0]
            ]
          }`
        const value = `${
          nestedResponse[this.nextType.fieldsArr[i]]
        }`
        // console.log(redisKey, value)
       
      
        
          this.redisClient.setex(redisKey, 3600, value)
          // newKeysCached++ 
        
     
    }
  }

  checkRedis(key) {
    return new Promise((resolve, reject) => {
      this.redisClient.exists(key, (err, exists) => {
        err ? reject(err) : resolve(exists)
      })
    })
  }

  getFromRedis(key) {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (error, result) =>
        error ? reject(error) : resolve(result)
      )
    })
  }
}

module.exports = ExpCache
