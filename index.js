const express = require('express');
const app = express();
const expressGraphql = require('express-graphql');
const movieSchema = require('./schemas/movie');

app.get('/', function (req, res) {
    res.send('Hello GraphQL');
});

app.use('/graphql', expressGraphql.graphqlHTTP({
    schema: movieSchema,
    graphiql: true,
}));

app.listen(3005);
