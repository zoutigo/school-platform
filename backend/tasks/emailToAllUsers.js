const cron = require('node-cron')
const MailP = require('../models/MailP')
const UserP = require('../models/UserP')
const { toAllUsersEmail } = require('../service/mailer')

const emailToAllUsersTask = cron.schedule(
  '05 12 * * *',
  () => {
    const errors = []
    const sendMails = async () => {
      const mails = await MailP.findAll({
        where: { isSent: false },
      })
      const users = await UserP.findAll({
        where: { isVerified: true },
      })

      try {
        users.forEach(async (user) => {
          await Promise.all(
            mails.map(async (mail) => {
              const { transporter, options } = toAllUsersEmail(mail, user)
              await transporter.sendMail(options, async (error, info) => {
                if (error) {
                  errors.push(error)
                }
              })
              // eslint-disable-next-line no-param-reassign
              mail.isSent = true
              await mail.save()
            })
          )
        })
      } catch (err) {
        console.log(err)
      }
    }

    sendMails()
    // console.log('hello')
  },
  {
    scheduled: false,
    timezone: 'Europe/Paris',
  }
)

module.exports = emailToAllUsersTask
