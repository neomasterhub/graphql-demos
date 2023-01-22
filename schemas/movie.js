const movies = require('./movies.json');
const countries = require('./countries.json');

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
        genres: { type: new GraphQLList(GraphQLString) },
        country_code: { type: GraphQLString },
        country: {
            type: CountryType,
            resolve(parent, args) {
                return countries.find(c => c.code == parent.country_code);
            }
        },
    }),
    description: 'Movie lorem ipsum.',
});

const CountryType = new GraphQLObjectType({
    name: 'Country',
    fields: () => ({
        name: { type: GraphQLString },
        code: { type: GraphQLString },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        moviesOfYear: {
            type: new GraphQLList(MovieType),
            args: {
                year: { type: GraphQLInt },
                country_code: { type: GraphQLString },
            },
            resolve(parent, args) {
                return movies.filter(m =>
                    m.year === args.year
                    && m.country_code == args.country_code);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: Query,
});
