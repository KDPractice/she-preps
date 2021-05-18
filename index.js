//dependency imports
const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

//relative imports
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config');



const server = new ApolloServer({
    typeDefs, 
    resolvers
});


mongoose
    .connect(MONGODB, {useNewUrlParser: true} )
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.error(err)
    })