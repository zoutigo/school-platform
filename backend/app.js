/* eslint-disable no-nested-ternary */
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const handleErrors = require('./middlewares/handleErrors')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const papersRouter = require('./routes/papers')
const eventsRouter = require('./routes/events')
const entitiesRouter = require('./routes/entities')
const rolesRouter = require('./routes/roles')
const imagesRouter = require('./routes/images')
const pagesRouter = require('./routes/pages')
// const datasRouter = require("./routes/datas");

// const filesRouter = require('./routes/files')

dotenv.config()

const app = express()

// Database connexion

const DB_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_MODE === 'test'
      ? process.env.DB_TEST
      : process.env.DB_DEV
    : process.env.DB_DEV

mongoose
  .connect(process.env.MONGO_URI || DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connexion établie à la base de donnée'))
  .catch((err) => console.log(err))

app.use(
  cors({
    // exposedHeaders: ["x-access-token"],
  })
)
app.use(
  cors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['x-access-token'],
  })
)
app.all('', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use(logger('dev'))
app.use(express.json({ limit: '50mb', extended: true }))
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(process.env.PWD + "/public"));

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/events', eventsRouter)
app.use('/papers', papersRouter)
app.use('/entities', entitiesRouter)
app.use('/roles', rolesRouter)
app.use('/images', imagesRouter)
app.use('/pages', pagesRouter)
// app.use('/files', filesRouter)

app.use(handleErrors)

module.exports = app
