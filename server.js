require('dotenv').config();
// Require in Express and app
const express = require('express');
const app = express();
// Require/Config dotenv for access to your PORT
const PORT = 4000;

// Require GraphQL and Schema
// const graphql  = require('express-graphql');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

// Initialize up Redis Client
const redis = require('redis');
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});


// Require in RediQLess middleware
// const { RediQLess } = require('rediqless');
const { RediQLess } = require('./src');
// Pass redisClient into RediqLess Constructor
const RediQL = new RediQLess(redisClient);
// Implement RediQLess' query capability
const RediQLQuery = RediQL.query;
// Implement RediqLess' cache clearing capability
const RediQLClear = RediQL.clearCache;

const cors = require('cors');
const corsOptions = {
    origin: [
        'http://localhost:4000',
    ],
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'application/json'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Leverage RediQLess Queries
// ** Assign queries on the front-end to 'req.body.data.query'
app.use('/rediql', RediQLQuery, (req, res) => {
    return res.status(202).send(res.locals.query)
});

// Leverage RediQLess Cache Clearing
app.use('/clearcache', RediQLClear, (req, res) => {
    return res.status(202).send('Cache Cleared')
});

// RediQLess query will forward request to this Middleware if information is not yet cached
app.use('/graphql', graphqlHTTP.graphqlHTTP({ schema: schema, graphiql: true }));

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
app.get('/', async (req, res) => {
    const query = {
        "query": "{\n  hello\n}",
        "variables": null
    };
    const response = await fetch('http://localhost:4000/graphql', {
        method: 'post',
        body: JSON.stringify(query),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});