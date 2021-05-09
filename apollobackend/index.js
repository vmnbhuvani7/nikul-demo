import express from 'express';
import apollo from 'apollo-server-express';
const  { ApolloServer, AuthenticationError } = apollo;
import models,{ connectDB } from './models/index.js';
import schema from './schema/index.js';
import resolvers from './resolvers/index.js';
import schemaDirectives from './directives/index.js'
import http from 'http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config('./.env');
let ObjectId = mongoose.Types.ObjectId

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));


ObjectId.prototype.valueOf = function() {
    return this.toString();
};

const getMe = async (req) => {
    const token = req.headers['x-token'];
    if(token){
        try{
            const me = await jwt.verify(token, process.env.SECRET)
            return await models.User.findById(me.id)
        }catch(e) {
            throw new AuthenticationError('Session Invalid or expired.')
        }
    }
}

const server = new ApolloServer({
    typeDefs : schema,
    resolvers,
    schemaDirectives,
    formatError : error => {
        const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
  
      return { ...error, message };
    },
    formatResponse : response => response,
    context : async ({req, res}) => {
        if(req){
            const me = await getMe(req)
            return {
                models,
                me,
                secret: process.env.SECRET
            }
        }
    }
})

server.applyMiddleware({ app, path : '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer)

connectDB().then( async () => {
    httpServer.listen({ port }, () => {
        console.log(`Apollo Server on http://localhost:${port}/graphql`);
    })
} )