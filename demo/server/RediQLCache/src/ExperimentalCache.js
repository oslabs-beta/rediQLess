class ExpCache {
    constructor(QLQuery, QLResponse){
        this.createQuery = this.createQuery.bind(this)
        this.cacheResponse = this.cacheResponse.bind(this)
        this.QLQuery = QLQuery
        this.QLResponse = QLResponse
    }


    createQuery(){
        //create query will check what fields already exist in the cache and return new query with only uncached information
        //cacheResponse will use this query to navigate the query and cache the response

        console.log('parsed query, drilled to first query type => ',this.QLQuery['definitions'][0].selectionSet.selections[0].name.value)
        //if a selection in a selection set does not have a "selectionSet" key, 
        //it can be assumed to be a type, and not a field (i.e. Nested graphQL querys.) 
            
        //a way of handling nested queries still needs to be addressed.

        console.log('parsed query, drilled to first query field => ', this.QLQuery['definitions'][0].selectionSet.selections[0].selectionSet.selections[0].name.value)
        console.log('fields length => ', this.QLQuery['definitions'][0].selectionSet.selections[0].selectionSet.selections.length)

        const queryTypes = this.QLQuery['definitions'][0].selectionSet.selections[0].name.value
        const fieldsObj = this.QLQuery['definitions'][0].selectionSet.selections[0].selectionSet.selections
        const fieldsArr = fieldsObj.map(field => field.name.value) 
        console.log('fields Array => ', fieldsArr)
        this.QLQuery = {
          types: queryTypes,
          fieldsArr: fieldsArr
        }
    }

    cacheResponse(){
        //send request from createQuery
      
        console.log('query data from createQuery => ', this.QLQuery)
        //given a unique value (in this example it is flight_number) 
        //the corresponding values could be cached with that unique value concatenated for the key value.
      this.QLResponse[this.QLQuery.types].map(field => { 
          console.log(`${this.QLQuery.fieldsArr[0]} ${field[this.QLQuery.fieldsArr[0]]}`, '\n',
          `${this.QLQuery.fieldsArr[1]} ${field[this.QLQuery.fieldsArr[0]]}`
          )
          
        })
    }
}

module.exports = ExpCache
