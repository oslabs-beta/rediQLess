const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();
const gqlHTTP = require("express-graphql");
const PORT = process.env.PORT || 3000;

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

app.use("/graphql", gqlHTTP.graphqlHTTP({ graphiql: true }));


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../index.html'));
});

// Default Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught an unknown error",
    status: 400,
    message: { err: "Oops! An error occured!" },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(defaultErr);
});

// Catch all unknown routes(404)
app.use((req, res) => res.status(404).send("Page not found!"));

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
