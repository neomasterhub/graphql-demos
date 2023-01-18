const movies = require('./movies.json');
const graphql = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} = graphql;

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        title: { type: GraphQLString },
        year: { type: GraphQLInt },
        cast: { type: new GraphQLList(GraphQLString) },
        genres: {type: new GraphQLList(GraphQLString) },
    }),
    description: 'Movie lorem ipsum.',
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        moviesOfYear: {
            type: new GraphQLList(MovieType),
            args: { year: { type: GraphQLInt } },
            resolve(parent, args) {
                return movies.filter(m => m.year === args.year);
            },
        }
    },
});

module.exports = new GraphQLSchema({
    query: Query,
});
