const nodemailer = require('nodemailer')
const HTMLParser = require('node-html-parser')
const handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')

require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  secure: false, // true for 465, false for other ports
  logger: true,
  debug: false,
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

const logopath = path.join('./images', 'logo.svg')

module.exports.emailConfirmMail = (user) => {
  const options = {
    from: ` "Ecole Saint Augustin Crémieu" <${process.env.MAILER_USER}>`,
    to: user.email,
    subject: "Confirmation de l'adresse mail",
    text: `Bonjour.L'école Saint Augustin est heureuse de vous acceuillir parmi ses visiteurs réguliers.
    Afin de confirmer votre adresse mail et pour des raisons de sécurité , merci de bien vouloir coller le lien suivant sur votre navigateur.
    ${URL}/users/verification-email?token=${user.emailToken}
    `,
    html: `
    <h1>Bonjour</h1>
    <p>L'école Saint Augustin est heureuse de vous acceuillir parmi ses visiteurs reguliers.</p>
    <p>Afin de confirmer votre adresse mail et pour des raisons de sécurité , merci de bien vouloir cliquer le lien suivant: </p>
    <a href="${URL}/users/verification-email?token=${user.emailToken}">Verifiez votre compte maintenant </a>
    `,
  }

  return { transporter, options }
}
module.exports.emailLosspass = (user) => {
  const options = {
    from: ` "Ecole Saint Augustin Cremieu" <${process.env.MAILER_USER}>`,
    to: user.email,
    subject: 'Reinitialisation du mot de pass',
    text: `Bonjour.Nous avons bien pris en compte votre demande de reinitialisation du mot de pass.
    Merci de bien vouloir coller ce lien sur votre navigateur afin de procéder au changement.
    ${URL}/private/identification/losspass/${user.losspassToken}
    `,
    html: `
    <h3>Bonjour</h3>
    <p>Nous avons bien pris en compte votre demande de reinitialisation du mot de pass.</p>
    <p>Afin de procéder au changement, merci de bien vouloir cliquer sur le lien ci dessous ou bien  coller ce lien sur votre navigateur.  </p>
    <p><a href="${URL}/private/identification/losspass/${user.losspassToken}">Je modifie mon mot de pass</a></p>
    `,
  }

  return { transporter, options }
}

module.exports.emailPreincriptionToUser = (datas) => {
  const options = {
    from: ` "Ecole Saint Augustin Crémieu" <${process.env.MAILER_USER}>`,
    to: datas.parent.email,
    subject: "Recapitulatif de pré-inscription à l'Ecole Saint Augustin",
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
    <td>${datas.parent.firstname}</td>
    </tr>
    <tr>
    <td>Nom du parent</td>
    <td>${datas.parent.lastname}</td>
    </tr>
    <tr>
    <td>Telephone </td>
    <td>${datas.parent.phone}</td>
    </tr>
    <tr>
    <td>Adresse mail </td>
    <td>${datas.parent.email}</td>
    </tr>
    <tr>
    <td>Nom de l'enfant </td>
    <td>${datas.childFirstname}</td>
    </tr>
    <tr>
    <td>Classe souhaité </td>
    <td>${datas.classroom.name}</td>
    </tr>
    <tr>
    <td>Message </td>
    <td>Pas de message</td>
    </tr>
    </table>
   
    <p>En attendant , n'hésitez pas à visiter <a href=${SERVER_ONLINE_ADRESS}> le site de l'école </a>
     pour vous impréngner un peu plus de la vie scolaire et de l'actualité</p>

    <p> A tres bientot, le secretariat </p>
    `,
  }

  return { transporter, options }
}
module.exports.emailPreincriptionToManager = (datas) => {
  const message = datas.message
    ? HTMLParser.parse(datas.message)
    : 'Pas de message'
  const options = {
    from: ` "Ecole Saint Augustin Crémieu" <${process.env.MAILER_USER}>`,
    to: 'zoutigo@gmail.com',
    subject: `Une nouvelle pré-incription en classe de ${datas.classroom.name}: ${datas.childFirstname}`,
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
    <td>${datas.parent.firstname}</td>
    </tr>
    <tr>
    <td>Nom du parent</td>
    <td>${datas.parent.lastname}</td>
    </tr>
    <tr>
    <td>Telephone </td>
    <td>${datas.parent.phone}</td>
    </tr>
    <tr>
    <td>Adresse mail </td>
    <td>${datas.parent.email}</td>
    </tr>
    <tr>
    <td>Nom de l'enfant </td>
    <td>${datas.childFirstname}</td>
    </tr>
    <tr>
    <td>Classe souhaité </td>
    <td>${datas.classroom.name}</td>
    </tr>
    <tr>
    <td>Message </td>
    <td>${message}</td>
    </tr>
    </table>
   
    <p>En attendant , n'hésitez pas à visiter <a href=${SERVER_ONLINE_ADRESS}> le site de l'école </a> pour vous impréngner un peu plus de la vie scolaire et de l'actualité</p>

    <p> A tres bientot, le secretariat </p>
    `,
  }

  if (datas.filename) {
    options.attachments = [
      {
        filename: datas.filename,
        path: `${URL}/${datas.filepath}`,
      },
    ]
  }

  return { transporter, options }
}

module.exports.userSuggestionEmail = (suggestion, user) => {
  const emailUserSuggestionTemplateSource = fs.readFileSync(
    path.join('./backend', 'templates', 'email.hbs'),
    'utf8'
  )

  const template = handlebars.compile(emailUserSuggestionTemplateSource)

  const htmlToSend = template({
    ...suggestion,
    logo: logopath,
  })

  const options = {
    from: ` "Ecole Saint Augustin Crémieu" <${process.env.MAILER_USER}>`,
    to: user.email,
    subject: `Suggestion reçue: ${suggestion.title}`,
    html: htmlToSend,
  }

  return { transporter, options }
}
module.exports.adminSuggestionEmail = (suggestion, user) => {
  const emailUserSuggestionTemplateSource = fs.readFileSync(
    path.join('./backend', 'templates', 'adminSuggestionEmail.hbs'),
    'utf8'
  )

  const template = handlebars.compile(emailUserSuggestionTemplateSource)

  const htmlToSend = template({
    ...suggestion,
    logo: logopath,
    ...user,
  })

  const options = {
    from: ` "Ecole Saint Augustin Crémieu" <${process.env.MAILER_USER}>`,
    to: process.env.MAILER_USER,
    subject: `Suggestion reçue: ${suggestion.title}`,
    html: htmlToSend,
  }

  return { transporter, options }
}
