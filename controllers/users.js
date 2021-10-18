import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import user from '../models/user.js';

import mongoose from 'mongoose';

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await user.findOne({email})

        if (!existingUser) return res.status(404).json({message: "User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials."})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: '1h'} )

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong."})
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, userName, userIcon, persistentId, defaultCorPref } = req.body;

    try {
        const existingUserEmail = await user.findOne({email})
        const existingUserUsername = await user.findOne({userName})

        if (existingUserEmail || existingUserUsername) return res.status(400).json({message: "User already exists."})

        if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match."})

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await user.create({ email, password: hashedPassword, userName, userIcon, persistentId, defaultCorPref })

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', {expiresIn: '1h'} )

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong."})
    }
}


export const editProfile = async (req, res) => {
    
    const {email, password, persistentId} = req.body;

    try {
        const existingUser = await user.findOne({persistentId})

        console.log(existingUser)

        const result = await user.deleteOne({persistentId})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: '1h'} )

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong."})
    }
}


export const updateProfile = async (req, res) => {
    const { email, password, confirmPassword, userName, userIcon, persistentId, defaultCorPref } = req.body;

    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that ID');
    
    if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match."})
    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await user.findByIdAndUpdate(_id, { ...post, _id, password: hashedPassword}, { new: true })

    const token = jwt.sign({ email: updatedUser.email, id: updatedUser._id }, 'test', {expiresIn: '1h'} )

    res.status(200).json({ result: updatedUser, token });
    //res.json(updatedUser);
}