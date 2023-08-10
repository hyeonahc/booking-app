import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { UserModel } from './models/User.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

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

const jwtSecret = 'mb8neLvWSb725XC8aRchL1UeXC2pSNgjqodXxKyVj6mR2aP8dxn'

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const userDoc = await UserModel.findOne({
    email,
  })
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err
          // Not Working: not setting cookie in browser
          res.cookie('token', token, { sameSite: 'none' }).json(userDoc)
        }
      )
    } else {
      res.status(422).json('pass not ok')
    }
  }
})

// Not Working: Line 60 issue should be resolved first
app.get('/profile', (req, res) => {
  const { token } = req.cookie
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, _id } = await UserModel.findById(userData.id)
      res.json({ name, email, _id })
    })
  } else {
    res.json(null)
  }
})

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
