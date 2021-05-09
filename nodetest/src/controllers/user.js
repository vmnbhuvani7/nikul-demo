import { User } from '../models';
import jwt from 'jsonwebtoken';

const generateToken = async (user,secret, expiresIn) => {
    const { id } = user
    return await jwt.sign({ id}, secret, { expiresIn}) 
}

export const signUp = async (req, res) => {
    console.log("body", req.body);
    const user = await User.create(req.body);
    res.status(201).send(user)
}

export const signIn = async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isValid = await user.matchPassword(password)
    if(!isValid){
       return res.status(401).send({ message : "Invalid Credentials" })
    }
    const token = await generateToken(user, process.env.SECRET, '8h')
    res.send({ user , token })
}

export const getUsers = async (req,res) => {
    const users = await User.find({});
    res.send(users);
}

export const getUser = async (req,res) => {
    const user = await User.findById(req.user.id);
    res.send(user);
}

export const editUser = async (req,res) => {
    const { cars } = req.body
    const user = await User.findById(req.user.id);
    if(!user) return null;
    if(cars){
        const result = await User.findByIdAndUpdate(user._id, { $push : { cars : cars } }, { new : true })
        return res.send(result);
    }else{
        const result = await User.findByIdAndUpdate(user._id, req.body, { new: true })
        res.send(result);
    }
}

export const deleteUser = async (req,res) =>{
    const user =await User.findById(req.params.userId);
    if(!user) return null;
    const result = await User.findByIdAndUpdate(user._id, { isDeleted : true }, { new: true })
    res.status(204).send(result);
}