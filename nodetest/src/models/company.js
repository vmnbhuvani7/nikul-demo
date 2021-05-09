import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const companySchema = new mongoose.Schema({
    title: {
        type: String
    },
    user: {
        type: Number,
    }
}, {
    timestamps : true
})

const Company = mongoose.model('company', companySchema);
export default Company;