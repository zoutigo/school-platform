const { mailConfirm } = require('.')

const sendConfirmMailService = async (user) => {
  const { transporter, options } = mailConfirm(user)

  try {
    await transporter.sendMail(options, (error, info) => {
      if (error) return { sendMailError: error }
      return { sendMailError: false }
    })
  } catch (error) {
    return { sendMailError: error }
  }
}

module.exports = sendConfirmMailService
