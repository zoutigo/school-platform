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

module.exports.emailPreincriptionToUser = (user, datas) => {
  const options = {
    from: ` "Fred Foo 👻" <${process.env.MAILER_USER}>`,
    to: user.email,
    subject: "Recapitulatif de pé incription à l'Ecole Saint Augustin",
    html: `
    <h1>Bonjour</h1>
    <p>L'école Saint Augustin est heureuse de vous acceuillir parmi ses visiteurs reguliers.</p>
    <p>Nous avons bien reçu votre demande de pré incription. Elle sera traitée dans les plus bref délai. </p>
    <p>Nous allons tres prochainement prendre contact avec vous à travers les informations que vous nous avez communiquées</p>
    <table>
    <tr style="bacground:whitesmoke">
    <th> ...</th>
    <th> Données </th>
    </tr>
    <tr>
    <td>Prénom du parent</td>
    <td>${user.firstname}</td>
    </tr>
    <tr>
    <td>Nom du parent</td>
    <td>${user.lastname}</td>
    </tr>
    <tr>
    <td>Telephone </td>
    <td>${user.phone}</td>
    </tr>
    <tr>
    <td>Adresse mail </td>
    <td>${user.email}</td>
    </tr>
    <tr>
    <td>Nom de l'enfant </td>
    <td>${datas.childFirstname}</td>
    </tr>
    <tr>
    <td>Classe souhaité </td>
    <td>${datas.classroom}</td>
    </tr>
    <tr>
    <td>Message </td>
    <td>${datas.message}</td>
    </tr>
    </table>
   
    <p>En attendant , n'hésitez pas à visiter <a href=${SERVER_ONLINE_ADRESS}> le site de l'école </a> pour vous impréngner un peu plus de la vie scolaire et de l'actualité</p>

    <p> A tres bientot, le secretariat </p>
    `,
  }

  return { transporter, options }
}
module.exports.emailPreincriptionToManager = (user, datas) => {
  const options = {
    from: ` "Fred Foo 👻" <${process.env.MAILER_USER}>`,
    to: user.email,
    subject: `Une nouvelle pré-incription en classe de ${datas.classroom}: ${datas.childFirstname}`,
    html: `
    <h1>Bonjour</h1>
    <p>L'école Saint Augustin est heureuse de vous acceuillir parmi ses visiteurs reguliers.</p>
    <p>Nous avons bien reçu votre demande de pré incription. Elle sera traitée dans les plus bref délai. </p>
    <p>Nous allons tres prochainement prendre contact avec vous à travers les informations que vous nous avez communiquées</p>
    <table>
    <tr style="bacground:whitesmoke">
    <th> ...</th>
    <th> Données </th>
    </tr>
    <tr>
    <td>Prénom du parent</td>
    <td>${user.firstname}</td>
    </tr>
    <tr>
    <td>Nom du parent</td>
    <td>${user.lastname}</td>
    </tr>
    <tr>
    <td>Telephone </td>
    <td>${user.phone}</td>
    </tr>
    <tr>
    <td>Adresse mail </td>
    <td>${user.email}</td>
    </tr>
    <tr>
    <td>Nom de l'enfant </td>
    <td>${datas.childFirstname}</td>
    </tr>
    <tr>
    <td>Classe souhaité </td>
    <td>${datas.classroom}</td>
    </tr>
    <tr>
    <td>Message </td>
    <td>${datas.message}</td>
    </tr>
    </table>
   
    <p>En attendant , n'hésitez pas à visiter <a href=${SERVER_ONLINE_ADRESS}> le site de l'école </a> pour vous impréngner un peu plus de la vie scolaire et de l'actualité</p>

    <p> A tres bientot, le secretariat </p>
    `,
  }

  return { transporter, options }
}
