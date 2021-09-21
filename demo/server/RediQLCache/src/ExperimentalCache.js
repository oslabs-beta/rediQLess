class ExpCache {
  constructor(QLQueryObj, QLResponse, redisClient) {
    this.createQuery = this.createQuery.bind(this)
    this.cacheResponse = this.cacheResponse.bind(this)
    this.checkRedis = this.checkRedis.bind(this)
    this.getFromRedis = this.getFromRedis.bind(this)
    this.QLQueryObj = QLQueryObj
    this.QLResponse = QLResponse
    this.newResponse = {}
    this.redisClient = redisClient
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
    // console.log('fields length => ', this.QLQueryObj['definitions'][0].selectionSet.selections[0].selectionSet.selections.length)

    const queryTypes =
      this.QLQueryObj['definitions'][0].selectionSet.selections[0].name.value
    const fieldsObj =
      this.QLQueryObj['definitions'][0].selectionSet.selections[0].selectionSet
        .selections

    const fieldsArr = fieldsObj.map((field) => {
      return field.name.value
    })
    console.log('fieldsArr', fieldsArr)
    // redis fields will check the fields arr and return only fields that don't have existing keys in redis
    let redisFields = []
    for (let i = 0; i < fieldsArr.length; i++) {
      let exists = await this.checkRedis(`${fieldsArr[i]} 1`)
      if (!exists) redisFields.push(fieldsArr[i])
    }
    console.log('redisFields Array => ', redisFields)
    this.QLQueryObj = {
      types: queryTypes,
      fieldsArr: fieldsArr,
    }
    console.log(this.QLQueryObj)
  }

  async cacheResponse() {
    //send request from createQuery
    //keyExists checks Redis for the given key
    let keyExists = false

    this.newResponse[`${this.QLQueryObj.types}`] = []

    console.log('reconstructed query from createQuery => ', this.QLQueryObj)

    // console.log('first three values of response to reduce console clutter')
    // for (let i = 0; i < 3; i++) {
    //   console.log(this.QLResponse[this.QLQueryObj.types][i])
    // }

    //given a unique value (in this example it is flight_number)
    //the corresponding values could be cached with that unique value concatenated for the key value.
    // console.log(this.QLResponse)
    let newKeysCached = 0
    let foundKeys = 0

    for (let j = 0; j < this.QLResponse[this.QLQueryObj.types].length; j++) {
      this.newResponse[`${this.QLQueryObj.types}`][j] = {}
      //loops through graphQL response, caching the values as "`${fieldname + id}` : value". In this case the id is flight_number.
      for (let i = 0; i < this.QLQueryObj.fieldsArr.length; i++) {
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
          newKeysCached++
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
          foundKeys++
        }
      }
    }

    console.log(
      `${newKeysCached} new keys cached into redis. ${foundKeys} found in redis cache.`
    )
    let firstThree = []

    for (let i = 0; i < 3; i++) {
      firstThree.push(this.newResponse[this.QLQueryObj.types][i])
    }
    console.log('new response from values from cache(first 3)', firstThree)
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
