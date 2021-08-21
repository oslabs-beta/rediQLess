const { parse } = require('graphql/language/parser');
const { visit, BREAK } = require('graphql/language/visitor');
const { graphql } = require('graphql');

const axios = require('axios')
const { request, gql } = require('graphql-request')
const redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379
const redisClient = redis.createClient(REDIS_PORT)
// const redisClient = redis.createClient(REDIS_PORT)

// redisClient.on("error", (err) => {
//   console.log(err)
// })

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

// const rediQL = (redisClient, schema) => async (req,res,next) => {

//     // check redisClient for data
//     // searches redis cache
//     // if if finds it, it returns on the res 

//     //if it doesn't find data
//     //make the gql request

// }

class RediQLCache {
    constructor (){
        console.log('constructor ', request)
        this.QLQuery = `
        { 
          launches {
            flight_number
            mission_name
            launch_date_utc
            launch_success
          }
        }`
        this.request = request
        this.query = this.query.bind(this)
        // this.url = url
        this.client = redisClient
        this.cache = this.cache.bind(this)
    }
    cache(){
        /*
        Sends a get request to the redis cache, if the first argument exists as a key, 
        it will return that key's data. If not, it will return false.
        */

        this.client.get(this.QLQuery, (err, data) => {
            if(err) throw err;
            if(data !== null) {
                console.log('Here is a bunch of data for you.')
                return data;     
            }
            else {
                console.log('Could not retrieve novel data, or you sent an invalid query.')
               return false;
            }
        })
    }

    async query(req, res, next){
       
    const foundCached = this.cache()
    console.log('Query already exists in the cache!')
    if (foundCached) return foundCached
    else {
        console.log(this.request, this.QLQuery)
        const responseData = await this.request('http://localhost:1500/graphql', this.QLQuery)
        console.log('Novel query has been made!')
        console.log('Here is your novel response data ', responseData)
        this.client.setex(this.QLQuery, 3600, JSON.stringify(responseData))
        res.locals.query = responseData
        console.log(responseData)
        return responseData

    }
    }
}


module.exports = RediQLCache