const nodemailer = require('nodemailer')
const HTMLParser = require('node-html-parser')
const handlebars = require('handlebars')
const inlineCss = require('inline-css')
const path = require('path')
const fs = require('fs')
const { logopath, rgpd } = require('../constants/texts')
const { inlinerOptions } = require('../constants/inlinerOptions')
const paperintrotext = require('../constants/paperintrotext')
const paperLink = require('../constants/paperLink')
const albumLink = require('../constants/albumLink')

require('dotenv').config()

const footerSource = fs.readFileSync(
  path.join('./backend', 'templates', 'footer.hbs'),
  'utf8'
)
const headerSource = fs.readFileSync(
  path.join('./backend', 'templates', 'header.hbs'),
  'utf8'
)
handlebars.registerPartial('footer', footerSource)
handlebars.registerPartial('header', headerSource)

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

const SERVER_ONLINE_ADRESS = 'https://www.ecole-st-augustin.fr'
const URL =
  process.env.NODE_ENV === 'production'
    ? SERVER_ONLINE_ADRESS
    : process.env.SERVER_ADRESS

module.exports.emailConfirmMail = async (user) => {
  const emailRegisterEmailConfirmTemplateSource = fs.readFileSync(
    path.join('./backend', 'templates', 'emailRegisterEmailConfirm.hbs'),
    'utf8'
  )

  try {
    const inlinedEmailRegisterEmailConfirmTemplateSource = await inlineCss(
      emailRegisterEmailConfirmTemplateSource,
      inlinerOptions
    )
    const template = handlebars.compile(
      inlinedEmailRegisterEmailConfirmTemplateSource
    )

    const tokenLink = `${URL}/users/verification-email?token=${user.emailToken}`
    const htmlToSend = template({
      tokenLink: tokenLink,
    })
    const options = {
      from: ` "Admin-Ecole Saint Augustin Crémieu" <${process.env.MAILER_USER}>`,
      to: user.email,
      subject: `Confirmation de l'adresse mail`,
      html: htmlToSend,
    }
    return { transporter, options }
  } catch (err) {
    return { err }
  }
}
module.exports.emailLosspass = async (user) => {
  const emailLossPassTemplateSource = fs.readFileSync(
    path.join('./backend', 'templates', 'emailLossPass.hbs'),
    'utf8'
  )

  try {
    const inlinedEmailLossPassTemplate = await inlineCss(
      emailLossPassTemplateSource,
      inlinerOptions
    )

    const template = handlebars.compile(inlinedEmailLossPassTemplate)
    const tokenlink = `${URL}/private/identification/losspass/${user.losspassToken}`
    const htmlToSend = template({
      tokenlink: tokenlink,
      logo: logopath,
      url: URL,
      rgpd: rgpd,
    })

    const options = {
      from: ` "Admin-Ecole Saint Augustin Crémieu" <${process.env.MAILER_USER}>`,
      to: user.email,
      subject: `Recupération du mot de pass`,
      html: htmlToSend,
    }

    return { transporter, options }
  } catch (err) {
    return { err }
  }
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
    path.join('./backend', 'templates', 'emailUserSuggestion.hbs'),
    'utf8'
  )

  const template = handlebars.compile(emailUserSuggestionTemplateSource)

  const htmlToSend = template({
    title: suggestion.title,
    topic: suggestion.topic,
    message: suggestion.message,
    firstname: user.firstname,
  })

  const options = {
    from: ` "Ecole Saint Augustin Crémieu" <${process.env.MAILER_USER}>`,
    to: user.email,
    subject: `Votre remarque intitulée ${suggestion.title}`,
    html: htmlToSend,
  }

  return { transporter, options }
}
module.exports.adminSuggestionEmail = (suggestion, user) => {
  const emailUserSuggestionTemplateSource = fs.readFileSync(
    path.join('./backend', 'templates', 'emailAdminSuggestion.hbs'),
    'utf8'
  )

  const template = handlebars.compile(emailUserSuggestionTemplateSource)
  const htmlToSend = template({
    title: suggestion.title,
    topic: suggestion.topic,
    message: suggestion.message,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    gender: user.gender,
  })

  const options = {
    from: ` "Ecole Saint Augustin Crémieu" <${process.env.MAILER_USER}>`,
    to: process.env.MAILER_USER,
    subject: `Suggestion reçue: ${suggestion.title}`,
    html: htmlToSend,
  }

  return { transporter, options }
}
module.exports.toAllUsersEmail = (mail, user) => {
  const emailToAllUsersTemplateSource = fs.readFileSync(
    path.join('./backend', 'templates', 'emailToAllUsers.hbs'),
    'utf8'
  )

  const template = handlebars.compile(emailToAllUsersTemplateSource)

  const htmlToSend = template({
    rgpd: rgpd,
    content: mail.content,
    title: mail.title,
    logo: logopath,
    firstname: user.firstname,
  })

  const options = {
    from: ` "Admin - Ecole Saint Augustin" <${process.env.MAILER_USER}>`,
    to: user.email,
    subject: `${mail.title}`,
    html: htmlToSend,
  }

  return { transporter, options }
}
module.exports.paperEmail = (paper, user) => {
  const emailPaperTemplateSource = fs.readFileSync(
    path.join('./backend', 'templates', 'emailPaper.hbs'),
    'utf8'
  )

  const template = handlebars.compile(emailPaperTemplateSource)

  const htmlToSend = template({
    title: paper.title,
    introtext: paperintrotext(paper),
    link: `${URL}${paperLink(paper)}`,
    firstname: user.firstname,
  })

  const options = {
    from: ` "Site - Ecole Saint Augustin" <${process.env.MAILER_USER}>`,
    to: user.email,
    subject: `Nouveau : ${paper.type} de ${paper.entity.name}`,
    html: htmlToSend,
  }

  return { transporter, options }
}
module.exports.albumEmail = (album, user) => {
  const emailAlbumTemplateSource = fs.readFileSync(
    path.join('./backend', 'templates', 'emailAlbum.hbs'),
    'utf8'
  )

  const template = handlebars.compile(emailAlbumTemplateSource)

  const htmlToSend = template({
    title: album.name,
    introtext: `un album a été posté par: ${album.entity.name}`,
    description: HTMLParser.parse(album.description),
    link: `${URL}${albumLink(album)}`,
    firstname: user.firstname,
  })

  const options = {
    from: ` "Site - Ecole Saint Augustin" <${process.env.MAILER_USER}>`,
    to: user.email,
    subject: `Nouvel album de ${album.entity.name}`,
    html: htmlToSend,
  }

  return { transporter, options }
}
