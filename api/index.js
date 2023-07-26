import cors from 'cors'
import express from 'express'

const app = express()

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
