const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/tmp/uploads', express.static('tmp/uploads'));
app.use(logger('dev'))

const PORT = process.env.PORT
const URI = process.env.MONGODB_URI
const userRoutes = require('./routes/userRoute')
const fileRoutes = require('./routes/uploadFile')
const error = require('./middlewares/errors')

mongoose.connect(URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB...'))
  .catch(err => console.log('An error occurred...', err))

app.use('/user', userRoutes)
app.use('/me', fileRoutes)
app.use(error)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))