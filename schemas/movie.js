const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        genre: { type: GraphQLString },
        name: { type: GraphQLString },
    }),
    description: 'Movie lorem ipsum.',
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
            },
        }
    },
});

module.exports = new GraphQLSchema({
    query: Query,
});
