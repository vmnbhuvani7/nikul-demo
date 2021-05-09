import apollo from 'apollo-server-express';
const { gql } = apollo

export default gql`
    type userRef {
        id : ID,
        firstName: String,
        lastName: String,
        email: String
    }

    type Blog {
        id : ID
        name: String
        description: String
        createdBy: ID
        updatedBy: ID
        createdAt: Date
        updatedAt: Date
    }

    type BlogRef {
        id : ID
        name: String
        description: String
        createdBy: userRef
        updatedBy: userRef
        createdAt: Date
        updatedAt: Date
    }

    type BlogPaginate {
        count: Int
        data: [BlogRef]
    }

    input blogInput {
        name: String
        description: String
    }

    extend type Query {
        getBlog (id: ID) : BlogRef
        getBlogs : [BlogRef]
        getAllBlogs (page: Int limit: Int filter: String) : BlogPaginate
        getPlans(plan_period: String): [Plan]
    }

    extend type Mutation {
        createBlog (input : blogInput!) : Blog @isAuth
    }

    extend type Subscription {
        blogChange : BlogSubscribe
    }

    type BlogSubscribe {
        keyType : String
        data: BlogRef
    }

    type Plan{
        id: ID
        product_id: ID
        plan_name: String
        plan_code: String
        plan_description: String
        price: Int
        plan_active: String
        billing_period: String
        billing_period_num: String
        billing_cycle: String
        billing_cycle_num: String
        trial_period: Int
        setup_fee: Int
        checkout_page: String
        createdAt: Date
        updatedAt: Date
    }
`;