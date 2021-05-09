import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config('../.env')

import User from './user.js'
import Blog from './blog.js'

const connectDB = () => {
    return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true,useCreateIndex : true, useUnifiedTopology: true, useFindAndModify : false })
}

const models = {
    User,
    Blog,
}

export { connectDB }
export default models