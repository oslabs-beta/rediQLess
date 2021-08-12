const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();
const gqlHTTP = require("express-graphql");
const PORT = process.env.PORT || 3000;
const schema = require('./schema/schema');

const redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379

const client = redis.createClient(REDIS_PORT)

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/**
 * @description
 * 
 * gqlHTTP works as middleware
we tell our app to head to the directory ofgraphql
then it hands off thecontrol of the request to graphqlHTTP()
make sure to access it on the gqlHTTP object
 *
 */

app.use("/graphql", gqlHTTP.graphqlHTTP({ schema, graphiql: true }));

// Default Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught an unknown error",
    status: 400,
    message: { err: "Oops! An error occured!" },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errObj.message);
});

// Catch all unknown routes(404)
app.use((req, res) => res.status(404).send("Page not found!"));

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
