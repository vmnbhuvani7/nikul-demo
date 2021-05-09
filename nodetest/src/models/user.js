import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";
import encrypt from 'mongoose-encryption'

// const carSchema = new mongoose.Schema({
//   company : {
//     type : String
//   },
//   model : {
//     type: String
//   },
//   color : {
//     type: String
//   }, 
//   price : {
//     type : Number
//   }
// })

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number
    },
    title: {
      type: String
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      validate: [isEmail, "Invalid Email."],
    },
    userName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum : ['admin', 'user'],
      default : 'user'
    },
    // cars: [carSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.plugin(encrypt, {
//   secret: "test@2021"
// })

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

// userSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

const User = mongoose.model("user", userSchema);
export default User;
