class ExpCache {
    constructor(QLQuery, QLResponse, redisClient){
        this.createQuery = this.createQuery.bind(this)
        this.cacheResponse = this.cacheResponse.bind(this)
        this.checkRedis = this.checkRedis.bind(this)
        this.QLQuery = QLQuery
        this.QLResponse = QLResponse
        this.redisClient = redisClient
        this.keyTracker = 0
    }


    createQuery(){
        //create query will check what fields already exist in the cache and return a new query with only uncached information
        //cacheResponse will use this query to navigate the query and cache the response

        console.log('parsed query, drilled to first query type => ',this.QLQuery['definitions'][0].selectionSet.selections[0].name.value)
        //if a selection in a selection set does not have a "selectionSet" key, 
        //it can be assumed to be a type, and not a field (i.e. Nested graphQL querys.) 
            
        //a way of handling nested queries still needs to be addressed.
 
        console.log('parsed query, drilled to first query field => ', this.QLQuery['definitions'][0].selectionSet.selections[0].selectionSet.selections[0].name.value)
        // console.log('fields length => ', this.QLQuery['definitions'][0].selectionSet.selections[0].selectionSet.selections.length)
      
        const queryTypes = this.QLQuery['definitions'][0].selectionSet.selections[0].name.value
        const fieldsObj = this.QLQuery['definitions'][0].selectionSet.selections[0].selectionSet.selections
        const fieldsArr = fieldsObj.map(field => field.name.value) 
        // console.log('fields Array => ', fieldsArr)
        this.QLQuery = {
          types: queryTypes,
          fieldsArr: fieldsArr
        }
    
    }

    async cacheResponse(){
        //send request from createQuery
        //keyExists checks Redis for the given key
        let keyExists = false;
        console.log('reconstructed query from createQuery => ', this.QLQuery)

        console.log('first three values of response to reduce console clutter')
        for (let i = 0; i < 3; i++) {
            console.log(this.QLResponse[this.QLQuery.types][i])
        }

        //given a unique value (in this example it is flight_number) 
        //the corresponding values could be cached with that unique value concatenated for the key value.
        // console.log(this.QLResponse)
        let newKeysCached = 0
        let foundKeys = 0
        
        for (let j = 0; j < this.QLResponse[this.QLQuery.types].length; j++){ 
 
        //loops through graphQL response, caching the values as "`${fieldname + id}` : value". In this case the id is flight_number.
          for(let i = 0; i < this.QLQuery.fieldsArr.length; i++) {
            keyExists = await this.checkRedis(`${this.QLQuery.fieldsArr[i]}` +` ${this.QLResponse[this.QLQuery.types][j][this.QLQuery.fieldsArr[0]]}`)
              if(!keyExists){
               this.redisClient.setex(`${this.QLQuery.fieldsArr[i]}` +` ${this.QLResponse[this.QLQuery.types][j][this.QLQuery.fieldsArr[0]]}`, 3600, `${this.QLResponse[this.QLQuery.types][j][this.QLQuery.fieldsArr[i]]}`)
              newKeysCached++
              }
              else { 
                  foundKeys++
              }
          }
        }
     
        console.log(`${newKeysCached} new keys cached into redis. ${foundKeys} found in redis cache.`)
    }

      checkRedis(key){
        return new Promise((resolve, reject) => {
        this.redisClient.exists(key, (err, exists) => { 
           err ? reject(err) : resolve(exists)
          })
        })
    }


}

module.exports = ExpCache
