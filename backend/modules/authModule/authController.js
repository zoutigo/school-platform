const crypto = require('crypto')
const sendConfirmMailService = require('../../globalServices/mailer/sendMailService')
const { BadRequest } = require('../../utils/errors')
const createUserService = require('./services/createUserService')
const generateTokenService = require('./services/generateTokenService')
const verifyPasswordService = require('./services/verifyPasswordService')
const verifyUserService = require('./services/verifyUserService')

module.exports.login = async (req, res, next) => {
  const { username: email, password } = req.body

  try {
    const { userVerified, error } = await verifyUserService(email)
    if (error) return next(error)
    if (!userVerified)
      return next(new BadRequest('email ou mot de passs invalide'))

    const { isVerified } = userVerified

    if (!isVerified && process.env.NODE_ENV === 'production')
      return next(
        new BadRequest(
          'Veillez valider votre compte grace au mail qui vous a été transmis lors de votre inscription'
        )
      )

    const passwordVerified = await verifyPasswordService(password, userVerified)
    if (!passwordVerified)
      return next(new BadRequest('email ou mot de pass invalide'))

    return res.status(200).send({
      message: 'connection effectuée avec succès',
      token: generateTokenService(userVerified),
    })
  } catch (error) {
    return next(error)
  }
}
module.exports.register = async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body

  const user = {
    email,
    password,
    emailToken: crypto.randomBytes(64).toString('hex'),
    firstname,
    lastname,
  }

  const { createdUser, userCreationError } = await createUserService(user)

  if (userCreationError) return next(userCreationError)

  if (createdUser && process.env.NODE_ENV !== 'production')
    return res.status(201).send({
      message:
        'Votre compte est correctement crée. Un mail de validation vous a été adressé',
      datas: createdUser,
    })

  const { sendMailError } = await sendConfirmMailService(createdUser)

  if (sendMailError) return next(sendMailError)
  return res
    .status(201)
    .send(
      'Votre compte est correctement crée. Un mail de validation vous a été adressé'
    )
}
