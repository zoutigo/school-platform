const MailP = require('../models/MailP')
const UserP = require('../models/UserP')
const { toAllUsersEmail } = require('../service/mailer')
const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')

require('dotenv').config()

module.exports.postMails = async (req, res, next) => {
  const { isAdmin, isManager, isModerator, id: userId } = req.user
  const { id: mailId, action } = req.query
  const userIsAllowed = isAdmin || isManager || isModerator

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  if (!userIsAllowed)
    return next(new Unauthorized('Uniquement reservé aux membres du site '))

  if (action === 'create') {
    const mail = req.body
    mail.userId = userId

    try {
      const savedMail = await MailP.create(mail)
      if (savedMail) {
        // const users = await UserP.findAll({
        //   where: { isVerified: true },
        // })

        // await Promise.all(
        //   users.map(async (user) => {
        //     const { transporter, options } = toAllUsersEmail(savedMail, user)
        //     await transporter.sendMail(options, (error, info) => {
        //       if (error) {
        //         return next(error)
        //       }
        //     })
        //   })
        // )

        return res.status(201).send({
          message:
            'le mail a été sauvegardé correctement pour envoi à la date que vous avez indiquée',
        })
      }
    } catch (err) {
      return next(err)
    }
  }
}
module.exports.getMails = async (req, res, next) => {
  try {
    const mails = await MailP.findAll({
      where: { isSent: process.env.NODE_ENV !== 'production' },
      order: [['createdAt', 'DESC']],
      limit: 5,
    })

    if (mails) return res.status(200).send(mails)
  } catch (err) {
    return next(err)
  }
}
