import express from 'express'
import blogModel from '../models/Blog.js'

const router = express.Router()

router.post('/', async (req,res) => {
    const {image, title, description} = req.body
    if(!image || !title || !description){
        return res.status(400).json({message: 'Please fill in all fields'})
    }
    try{
        const newBlog = new blogModel({image, title, description})
        await newBlog.save()
        return res.status(201).json({message: 'Blog created successfully'})
    } catch (error){
        return res.status(400).json({message: error.message})
    }
})

router.get('/', async (req,res) => {
    try{
        const blogs = await blogModel.find()
        return res.status(200).json(blogs)
    } catch (error){
        return res.status(400).json({message: error.message})
    }
})

export default router