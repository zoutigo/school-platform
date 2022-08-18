const dotenv = require('dotenv')

dotenv.config()

const errorLogger = (name, error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(name, ' : ', error)
  }
}

module.exports = errorLogger
