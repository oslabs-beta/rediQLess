const axios = require('axios')

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} = require("graphql");

// Launch Type 
/* POTENTIAL ADDITION/REMOVAL
 ADD: LAUNCH SITE{
    SITE_NAME
}

ADD: DETAILS (LAUNCH INFO)
*/
const CoreType = new GraphQLObjectType({
  name: "Core",
  fields: () => ({
    core_serial: { type: GraphQLString },
    block: { type: GraphQLInt },
    status: {type: GraphQLString },
    mission: {type: GraphQLString}
  })
})

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_date_utc: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    cost_per_launch: { type: GraphQLInt }, // we can remove
    // launch_site: { type: SiteType },
    // rocket: { type: GraphQLString},
    core_serial: { type: GraphQLString },
    rocket: { type: RocketType }
    // rocket: {
    //   // type: RocketType,
    //   // resolve(parent, args){
    //   //   console.log('RocketType parent ' + parent)
    //   //   return axios.get('https://api.spacexdata.com/v4/rockets')
    //   //   .then(res => res.data);
    //   type: new GraphQLList(RocketType),
    //   resolve: rocket => rocket.map('https://api.spacexdata.com/v4/rockets')
    // },
  })
});

// Rocket Type

// POTENTIAL ADDITIONS AND REMOVAL

const RocketType = new GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
      rocket_id: { type: GraphQLString },
      rocket_name: { type: GraphQLString },
      rocket_type: { type: GraphQLString },
      cost_per_launch: {type: GraphQLInt},
      boosters: { type: GraphQLInt },
      // first_stage: {type: GraphQLObjectType},
      core: { type: CoreType}
    }),
  });

  const CharacterType = new GraphQLObjectType({
    name: "Character",
    fields: () => ({
      id: { type: GraphQLID },
      name: {type: GraphQLString },
      status: { type: GraphQLString },
      species: {type: GraphQLString}
    })
  })

  const CharactersType = new GraphQLObjectType({
    name: "Characters",
    fields: () => ({
      results: [CharacterType]
    })
  })
// const SiteType = new GraphQLObjectType({
//   name: "launch_site",
//   fields: () => ({
//     site_id: { type: GraphQLString },
//     site_name: { type: GraphQLString },
//     site_name_long: { type: GraphQLString }
//   }),
// });

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        characters: {
            type: new GraphQLList(CharacterType),
            resolve(parent, args) {
                return axios
                .get('https://rickandmortyapi.com/api/character')
                .then(res => res.data)
            }
        },
        
          character: {
            type: CharacterType,
            args: {
              id: {type: GraphQLInt}
            },
            resolve(parent, args) {
              return axios 
              .get(`http://rickandmortyapi.com/api/character/${args.id}`)
            }
          },
        
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args){
                return axios
                .get('https://api.spacexdata.com/v3/launches')
                .then(res => res.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt } ,
                mission_name: { type: GraphQLString }
            },
            resolve(parent, args) {
              
                return axios
                .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res => res.data);
            }
        },
        rockets: {
          type: new GraphQLList(RocketType),
          resolve(parent, args){
              return axios.get('https://api.spacexdata.com/v3/rockets')
              .then(res => res.data);
          }
      },
        rocket: {
          type: RocketType,
          args: {
            id: { type: GraphQLString }
          },
          resolve(parent, args) {
            return axios
            .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
            .then(res => res.data)
          }
        },
        cores: {
          type: new GraphQLList(CoreType),
          resolve(parent, args){
              return axios
              .get('https://api.spacexdata.com/v3/cores')
              .then(res => res.data);
          }
      },
      core: {
        type: CoreType,
        args: {
            id: { type: GraphQLString } 
        },
        resolve(parent, args) {
          
            return axios
            .get(`https://api.spacexdata.com/v3/cores/${args.mission_name}`)
            .then(res => res.data);
        }
    },
     

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})