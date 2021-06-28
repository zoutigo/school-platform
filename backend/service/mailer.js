const nodemailer = require('nodemailer')
require('dotenv').config()
const { BadRequest } = require('../utils/errors')

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  secure: false, // true for 465, false for other ports
  logger: true,
  debug: true,
  auth: {
    user: process.env.MAILER_USER, // generated ethereal user
    pass: process.env.MAILER_PASS, // generated ethereal password
  },
  // ignoreTLS: true, // add this
  tls: {
    rejectUnauthorized: false,
  },
})

const SERVER_ONLINE_ADRESS = 'http://www.ecole-st-augustin.fr'

const URL =
  process.env.NODE_ENV === 'production'
    ? SERVER_ONLINE_ADRESS
    : process.env.SERVER_ADRESS

module.exports.emailConfirmMail = (user) => {
  const options = {
    from: ` "Fred Foo 👻" <${process.env.MAILER_USER}>`,
    to: user.email,
    subject: "Confirmation de l'adresse mail",
    text: `Bonjour.L'école Saint Augustin est heureuse de vous acceuillir parmi ses visiteurs reguliers.
    Afin de confirmer votre adresse mail et pour des raisons de sécurité , merci de bien vouloir coller ce lien sur votre navigateur
    ${URL}/users/verification-email?token=${user.emailToken}
    `,
    html: `
    <h1>Bonjour</h1>
    <p>L'école Saint Augustin est heureuse de vous acceuillir parmi ses visiteurs reguliers.</p>
    <p>Afin de confirmer votre adresse mail et pour des raisons de sécurité , merci de bien vouloir coller ce lien sur votre navigateur </p>
    <a href="${URL}/users/verification-email?token=${user.emailToken}">Verifiez dejà votre compte </a>
    `,
  }

  return { transporter, options }
}
