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
const variablesRouter = require('./routes/variables')
const cheminsRouter = require('./routes/chemins')
const preinscriptionsRouter = require('./routes/preinscriptions')
const albumsRouter = require('./routes/albums')
const suggestionsRouter = require('./routes/suggestions')
const dialogsRouter = require('./routes/dialogs')
const updatesRouter = require('./routes/updates')
const db = require('./config/database')
// const datasRouter = require("./routes/datas");

// const filesRouter = require('./routes/files')

dotenv.config()

const app = express()

// Postgres connexion

db.authenticate()
  .then(() => console.log('Postgres Database connected'))
  .catch((err) =>
    console.log(`connexion to postgres failed with error: ${err}`)
  )

// Mongodb Database connexion

const DB_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NODE_ENV === 'test'
      ? process.env.DB_TEST
      : process.env.DB_DEV
    : process.env.DB_PROD

mongoose
  .connect(process.env.MONGO_URI || DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connexion établie à la base de donnée'))
  .catch((err) => console.log('mongo connexion error', err))

const allowedOrigins = ['http://localhost:3000', process.env.SERVER_ADRESS]

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
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

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/images', express.static(path.join(__dirname, '..', '/images')))
app.use('/files', express.static(path.join(__dirname, '..', '/files')))

app.use(logger('dev'))
app.use(express.json({ limit: '50mb', extended: true, inflate: true }))
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
)
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(process.env.PWD + "/public"));

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/events', eventsRouter)
app.use('/papers', papersRouter)
app.use('/entities', entitiesRouter)
app.use('/roles', rolesRouter)
app.use('/images', imagesRouter)
app.use('/pages', pagesRouter)
app.use('/variables', variablesRouter)
app.use('/chemins', cheminsRouter)
app.use('/preinscriptions', preinscriptionsRouter)
app.use('/albums', albumsRouter)
app.use('/suggestions', suggestionsRouter)
app.use('/dialogs', dialogsRouter)
app.use('/updates', updatesRouter)
// app.use('/files', filesRouter)

app.use(handleErrors)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})
module.exports = app
