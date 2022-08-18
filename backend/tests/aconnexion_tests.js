/* eslint-disable no-undef */

const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)

require('dotenv').config()

before((done) => {
  // enableTimeouts(false)

  mongoose.connect(process.env.DB_TEST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  mongoose.connection
    .once('open', () => {
      console.log('connexion to database is running')
      done()
    })
    .on('error', (error) =>
      console.warn('erreur de connexion à la base de donnéee', error)
    )
})
