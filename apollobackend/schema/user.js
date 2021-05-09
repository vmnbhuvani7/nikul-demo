import apollo from 'apollo-server-express';
const { gql } = apollo

export default gql`
    type Token {
        token : String
        user : User
    }

    type User {
        id : ID
        firstName: String
        lastName: String
        userName: String
        email: String
        phone: Number
        password: String
        gender: String
        dob: Date
        isActive: Boolean
        isDeleted: Boolean
        createdAt: Date
        updatedAt: Date
    }

    input userInput {
        firstName: String
        lastName: String
        userName: String
        email: String
        phone: Number
        password: String
        gender: String
        dob: Date
        isActive: Boolean
    }

    extend type Query {
        me : User
        getUsers : [User]
    }

    extend type Mutation {
        signUp (input : userInput!) : User
        signIn (email : String!, password : String!) : Token!
        updateUser(input : userInput!) : User
        deleteUser(id : ID!) : Boolean!
    }

    extend type Subscription {
        userChange : UserSubscribe
    }

    type UserSubscribe {
        keyType : String
        data: User
    }
`;