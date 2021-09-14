class ExpCache {
    constructor(QLQuery){
        this.createObj = this.createObj.bind(this)
        this.QLQuery = QLQuery
    }

    createObj(){
        console.log('parsed query, drilled to first query type => ',this.QLQuery['definitions'][0].selectionSet.selections[0].name.value)
        console.log('parsed query, drilled to first query field => ', this.QLQuery['definitions'][0].selectionSet.selections[0].selectionSet.selections[0].name.value)
    }
}

module.exports = ExpCache
