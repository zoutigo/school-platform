const cron = require('node-cron')
const moment = require('moment')
const { Op } = require('sequelize')
const PaperP = require('../models/PaperP')
const EntityP = require('../models/EntityP')
const UserP = require('../models/UserP')
const { paperEmail } = require('../service/mailer')
const { userInclude } = require('../constants/includes')
const classroomsAliasses = require('../constants/classroomAliasses')

const yesterday = moment().add(-1, 'days').toDate()
const today = moment().toDate()

const emailFromClassroomPost = cron.schedule(
  '30 11 * * *',
  () => {
    const sendPapersNotification = async () => {
      try {
        const users = await UserP.findAll({
          include: userInclude,
        })

        const papers = await PaperP.findAll({
          where: {
            createdAt: {
              [Op.between]: [yesterday, today],
            },
          },
          include: [
            {
              model: EntityP,
              attributes: ['id', 'name', 'alias'],
              required: true,
            },
          ],
          order: [['createdAt', 'DESC']],
        })

        classroomsAliasses.forEach((classroomAlias) => {
          const classroomPapers = papers.filter(
            (paper) => paper.entity.alias === classroomAlias
          )

          if (classroomPapers.length > 0) {
            const [dailyPaper, ...rest] = classroomPapers

            const parents = users.filter((user) => {
              const userEntities = user.entities
                ? user.entities.map((entity) => entity.alias)
                : []
              return (
                userEntities.length > 0 &&
                userEntities.includes(dailyPaper.entity.alias)
              )
            })

            parents.forEach(async (parent) => {
              const { transporter, options } = paperEmail(dailyPaper, parent)
              await transporter.sendMail(options, async (error, info) => {
                if (error) {
                  console.log('mail-error:', error)
                }
              })
            })
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
    sendPapersNotification()
  },
  {
    scheduled: false,
    timezone: 'Europe/Paris',
  }
)

module.exports = emailFromClassroomPost
