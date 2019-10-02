const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes')

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env'
})

const app = express()

const mongodbURI = process.env.MONGO_URL

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT, () =>
  console.log(`Listening on ${process.env.PORT}`)
)
