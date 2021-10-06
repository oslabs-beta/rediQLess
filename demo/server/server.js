
const path = require('path')
const PORT = 1500

//------------------------------------------------------------ 
// REQUIRED FOR REDIQLESS USE 
const express = require('express')
const app = express()

// --> REQUIRED FOR IMPLEMENTATION OF GQL
const graphql = require('express-graphql')
const schema = require('./schema/schema')

// --> REQUIRE REDIS & SET UP PORTS
const redis = require('redis')
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
})

// --> REQUIRE REDIQL MW
const RediQLCache = require('./RediQLCache/RediQL')
const RediQLess = new RediQLCache(redisClient)

const RediQLQuery = RediQLess.query
const RediQLClearCache = RediQLess.clearCache

// --> IMPLEMENTATION OF MW
app.use('/rediql', RediQLQuery, (req, res) => { 

  res.send(res.locals.query) 
})

app.use('/clearcache', RediQLClearCache, (req, res) => {
  res.send('cache cleared')
})

app.use('/graphql', graphql.graphqlHTTP({ schema, graphiql: true }))

//------------------------------------------------------------ 



app.use('/build', express.static(path.resolve(__dirname, '../build')))

app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}/graphql`)
})
