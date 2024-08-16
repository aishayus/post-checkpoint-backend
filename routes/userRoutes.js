import express from 'express'
import bcrypt from 'bcryptjs'
import userModel from '../models/User.js'

const router = express.Router()

//Create a new user
router.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields required' });
    }
    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(200).json({ message: 'User already Registered' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, username, email, password:hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});


router.post('/login', async (req,res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(400).json({message: 'All fields required'})
    }
    try{
        const user = await userModel.findOne({username})
        if(!user){
            return res.status(200).json({message: 'User not Found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(200).json({message: 'Incorrect Password or Username'})
        }
        return res.status(200).json({message: 'Login Successful', user}) 
    } catch(error){
        return res.status(400).json({message: error.message})
    }
})

export default router