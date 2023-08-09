import bcrypt from 'bcrypt'
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

const bcryptSalt = bcrypt.genSaltSync(10)

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
    const userDoc = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    })
    res.json(userDoc)
  } catch (error) {
    res.status(422).json(error)
  }
})

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
