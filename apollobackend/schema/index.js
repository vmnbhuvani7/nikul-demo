import apollo from 'apollo-server-express';
const { gql } = apollo

import userSchema from './user.js'
import blogSchema from './blog.js'

const linkSchema = gql`
    scalar Date
    scalar JSON
    scalar Number

    directive @isAuth on FIELD_DEFINITION

    type Query {
        _ : Boolean
    }

    type Mutation {
        _ : Boolean
    }

    type Subscription {
        _ : Boolean
    }
`;


export default [
    linkSchema,
    userSchema,
    blogSchema,
];