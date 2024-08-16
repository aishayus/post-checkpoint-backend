import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import blogRouter from './routes/blogRoutes.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/blog', blogRouter)

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}....`)
    })
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err)
})