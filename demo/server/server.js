const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();
const gqlHTTP = require("express-graphql");
const PORT = process.env.PORT || 3000;
const schema = require('./schema/schema');

const { ApolloServer } = require('apollo-server-express')
const { RESTDataSource } = require('apollo-datasource-rest')
// const typeDefs = require('./schema')
// const resolvers = require('./resolvers')
const { ApolloServerPluginLandingPageGraphQLPlayground,
ApolloServerPluginLandingPageProductionDefault,
ApolloServerPluginLandingPageLocalDefault
 } = require('apollo-server-core');


const gql = require('graphql-tag')

const typeDefs = gql`
  type Launch {
    flight_number: Int!
    mission_name: String!
    launch_date_utc: String!
    launch_success: Boolean!
    cost_per_launch: Int!
    rocket: Rocket!
  }

  type Rocket {
    rocket_id: String!
    rocket_name: String!
    rocket_type: String!
    cost_per_launch: Int!
    boosters: Int!
  }

  type Query {
    getLaunches: [Launch!]
    
  }
`

const resolvers = {
  Query: {
    getLaunches: async (_, { flight_number }, { dataSources } ) =>{
      return dataSources.SpaceXAPI.getLaunch(flight_number)
    }
  }
}

// Movies API Data Source
class SpaceXAPI extends RESTDataSource{
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v3/'

  }
  async getLaunch(flight_number) {
    return this.getLaunch(`launches/${flight_number}`)
  }
  async getRocket(id) {
    return this.getLaunch(`rockets/${id}`)
  }
}


// create apollo server constructor

const server = new ApolloServer({
  typeDefs,
  resolvers,
  graphiql: true,
  dataSources: () => {
    return {
      spaceXAPI: new SpaceXAPI()
    }
  },
  plugins: [
   {
     async serverWillStart(){
       return {
         async renderLandingPage(){
           return ApolloServerPluginLandingPageLocalDefault({ footer: false }) 
         }
       }
     }
   }
  ]
})
async function startApolloServer(){
  
  await server.start();

  const app = express();
  // route for additional middlware
  // server.applyMiddleware({ app });
  // app.use('/', )
  const PORT = process.env.PORT || 5000
;
  await new Promise(resolve => app.listen({ port: PORT }, resolve));
  console.log(`Server ready at ${PORT}`);
  return { server, app }
}

startApolloServer()
// const redis = require('redis')
// const REDIS_PORT = process.env.PORT || 6379

// const client = redis.createClient(REDIS_PORT)

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// /**
//  * @description
//  * 
//  * gqlHTTP works as middleware
// we tell our app to head to the directory ofgraphql
// then it hands off thecontrol of the request to graphqlHTTP()
// make sure to access it on the gqlHTTP object
//  *
//  */

// app.use("/graphql", gqlHTTP.graphqlHTTP({ schema, graphiql: true }));

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
// app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}`);
// });
