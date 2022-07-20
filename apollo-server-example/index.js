require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const redis = require('redis');
const { typeDefs, resolvers } = require('./schema');
const { RediQLess } = require('../src');
// Required logic for integrating with Express
const app = express();
const httpServer = http.createServer(app);

async function startApolloServer(typeDefs, resolvers) {
    
    const redisClient = redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    });
    await redisClient.connect();
    
    // Pass redisClient into RediqLess Constructor
    const RediQL = new RediQLess(redisClient);
    // Implement RediQLess' query capability
    const RediQLQuery = RediQL.query;
    app.use('/rediql', RediQLQuery, (req, res) => {
        return res.status(202).send(res.locals.query)
    });
    
    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);