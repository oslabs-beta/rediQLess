const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const app = express()
const gqlHTTP = require('express-graphql')
const PORT = process.env.PORT || 1500
const schema = require('./schema/schema')
const RediQLCache = require('./RediQLCache/src/RediQL')
const cors = require('cors')

const RediQL = new RediQLCache()

const RediQLQuery = RediQL.query
const RediQLClear = RediQL.clearCache

// what i would our import to look like
// import { RediQLess, ClearCache } from './RediQLCache/src/RediQL'


// const redis = require('redis')
// const REDIS_PORT = process.env.PORT || 6379

// const client = redis.createClient(REDIS_PORT)

// client.on("error", (err) => {
//   console.log(err)
// })

app.use(cors())

app.use('/build', express.static(path.resolve(__dirname, '../build')))

app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
)

//redis caching will be done within this object
// const rediQlCache = new RediQLCache(schema, redixPort, 3600)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// /**
//  * @description
//  *
//  * gqlHTTP works as middleware
// we tell our app to head to the directory ofgraphql
// then it hands off thecontrol of the request to graphqlHTTP()
// make sure to access it on the gqlHTTP object
//  *
//  */

// iimplementing RediQL
app.use('/rediql', RediQLQuery, (req, res) => {
  // console.log('res.locals.query => ', res.locals.query);
  res.send(res.locals.query)
})

app.use('/clearcache', RediQLClear, (req, res) => {
  res.send('cache cleared')
})

app.use('/graphql', gqlHTTP.graphqlHTTP({ schema, graphiql: true }))

/*
POTENTIAL IMPLEMENTATION:
app.use 
1st arg:/graphql
2nd: rediql middleware 
3rd: async function taking in req/res and setting the date to res.locals called graphQLResponse

I think our response time would be the res.locals.dif

app.use('/rediql', RediQL(redisClient, schema), async (req, res) => {
  console.log('dif is: ', res.locals.dif);
  return res.status(202).json({data: res.locals.graphQlResponse, responseTime: res.locals.dif})
})

*/

// // Default Error Handler
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: "Express error handler caught an unknown error",
//     status: 400,
//     message: { err: "Oops! An error occured!" },
//   };

//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errObj.message);
// });

// // Catch all unknown routes(404)
// app.use((req, res) => res.status(404).send("Page not found!"));

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}/graphql`)
})
