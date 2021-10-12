const express = require('express')
const path = require('path')
const app = express()

const graphqlHTTP = require('express-graphql')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT

const schema = require('./schema/schema')
const cors = require('cors')
const redis = require('redis')
const { RediQLess } = require('rediqless')
const redisClient = redis.createClient(process.env.REDIS_URL)

// --> REQUIRE REDIQL MW

const RediQL = new RediQLess(redisClient)
const RediQLQuery = RediQL.query
const RediQLClear = RediQL.clearCache

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/rediql', RediQLQuery, (req, res) => {
  console.log('exiting rediql endpoint', res.locals.responseTime)
  res.send(res.locals.responseTime)
})

app.use('/clearcache', RediQLClear, (req, res) => {
  res.send('cache cleared')
})

app.use(`/graphql`, graphqlHTTP.graphqlHTTP({ schema, graphiql: true }))

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')))
// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../index.html'))
})

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err)
  console.log(errorObj.log)
  return res.status(errorObj.status).json(errorObj.message)
})

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}/graphql`)
})
