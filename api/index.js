import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import { UserModel } from './models/User.js'

const app = express()

app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body
  UserModel.create({
    name,
    email,
    password,
  })
  res.json({ name, email, password })
})

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
