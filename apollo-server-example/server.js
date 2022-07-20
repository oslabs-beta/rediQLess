require('dotenv').config();
const { typeDefs, resolvers } = require('./schema');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { RediQLess } = require('../src');
const express = require('express');
const http = require('http');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const PORT = process.env.PORT || 4000;
const LOCAL_URL = process.env.LOCAL_URL || 'localhost';
const corsOptions = {
    origin: [
        `http://${LOCAL_URL}:${PORT}`,
        `http://${LOCAL_URL}:${PORT}/graphql`,
    ],
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'application/json'],
};
const app = express();
const httpServer = http.createServer(app);
const redis = require('redis');
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});
// For express to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToRedis = async function(req, res, next) {
    await redisClient.connect();
    next();
};

const disconnectToRedis = async function(req, res, next) {
    await redisClient.quit();
    next();
};

app.use('/rediql', [connectToRedis, new RediQLess(redisClient).query, disconnectToRedis], (req, res) => {
    res.send(res.locals.query);
});

app.use('/clearcache', [connectToRedis, new RediQLess(redisClient).clearCache, disconnectToRedis], (req, res) => {
    res.send(res.locals.query);
});

// Stimulate graphql POST request
app.get('/', async (req, res) => {
    const query = {
        data: {
            "query": "{\n HarryPotter\n {\n name\n authors \n {\n name \n nationality \n} \n ISBN\n publisher \n {\n name\n date \n }\n }\n}",
            "variables": null
        }
    };
    const response = await fetch(`http://${LOCAL_URL}:${PORT}/rediql`, {
        method: 'post',
        body: JSON.stringify(query),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    res.send(data);
});

// Initialize Apollo Server to enable graphql endpoint
async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        cors: corsOptions,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://${LOCAL_URL}:${PORT}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);






