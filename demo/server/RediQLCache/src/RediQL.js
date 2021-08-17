const redis = require('redis');
const { parse } = require('graphql/language/parser');
const { visit, BREAK } = require('graphql/language/visitor');
const { graphql } = require('graphql');

// build our class component for the RediQLCache
// create a controller method
    // reads query string from request obj --> gql query is parsed
    // constructs a response from the cache --> cache is filled
    // reformulates a query for any data not in cache --> cache gets overwritten in instance of novel data
    // passes reformulated query to graphql library to resolve --> 
    // joins cached and uncached responses
    // decomposes and caches the joined query
    // attaches the joined response to the response object before passing control to the next middleware

// LOOK UP GRAPHQL METHODS AND SEE HOW THEY WORK
// READ ABOUT AST

class RediQLCache {
    constructor(schema, redisPort, cacheExpiration = 2000){
        this.schema = schema;
        this.redisPort = redisPort;
        this.redisCache = redis.createClient(redisPort);
        this.query = this.query.bind(this);
        this.clearCache = this.clearCache.bind(this);
    }
    async query(req, res, next){
        //handle request without query
        if (!req.body.query){
            return next('Error: No graphQL request found on request body.')
        }
        //retrieve GraphQL query from request object
        const queryString = req.body.query;
        
        //create abstract syntax tree with graphql-js parser
        const AST = parse(queryString)
        console.log('AST => ', AST)
    }
}

module.exports = RediQLCache