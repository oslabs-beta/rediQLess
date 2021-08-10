const graphql = require('graphql');
const _ = require('lodash')
// import graphQL types from the graphQL packaged to use on the graphQL file
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

var movies = [
    {id: '1', name: 'Rambo'}, { id: '2', name: 'Terminator'}, {id: '3', name: 'Star Wars'}, {id: '4', name: 'Jerry McGuire'}
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
// place our queries in an object
    fields: {
        // parameters must match with schema
        movie: {
            // type of the data that we're querying
            type: MovieType,
            // when someone queires for a particular movie, we must pass in args
            // because we need to know what they want to query
            args: { id: { type: GraphQLID }},
            // resolve() to get our data
resolve(parent, args){
    // grab movie with particular id
    args.id
    console.log(typeof(args.id))
    return _.find(movies, { id: args.id} )
}
        },
        movieList: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})