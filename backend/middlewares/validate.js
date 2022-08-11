const { validationResult, ValidationChain } = require('express-validator')
const { BadRequest } = require('../utils/errors')

const validate = (validations) => async (req, res, next) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const validation of validations) {
    // eslint-disable-next-line no-await-in-loop
    const result = await validation.run(req)
    if (result.errors.length) break
  }

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  return next(new BadRequest(errors.array()[0].msg))

  // res.status(400).json({ errors: errors.array() })
}

module.exports = validate
