const countries = require('./countries.json');
const directors = require('./directors.json');
const movies = require('./movies.json');
const movie_director_rel = require('./movie_director_rel.json');

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
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        year: { type: GraphQLInt },
        cast: { type: new GraphQLList(GraphQLString) },
        genres: { type: new GraphQLList(GraphQLString) },
        country_code: { type: GraphQLString },
        country: {
            description: '1-* demo',
            type: CountryType,
            resolve(parent, args) {
                return countries.find(c => c.code == parent.country_code);
            }
        },
        directors: {
            description: '*-* demo',
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                const director_ids = movie_director_rel
                    .filter(md => md.movie_id == parent.id)
                    .map(md => {
                        return md.director_id;
                    });

                return directors.filter(d => director_ids.includes(d.id));
            }
        },
        deprecatedField: {
            type: GraphQLInt,
            deprecationReason: 'Deprecation lorem ipsum',
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

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movies: { 
            type: new GraphQLList(MovieType),
            resolve() {
                return movies;
            },
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve() {
                return directors;
            },
        },
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
