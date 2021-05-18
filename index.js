//dependency imports
const {ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');

//relative imports
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    context: ({ req }) => ({ req, pubsub })
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