const cron = require('node-cron')
const moment = require('moment')
const { Op } = require('sequelize')
const PaperP = require('../models/PaperP')
const EntityP = require('../models/EntityP')
const UserP = require('../models/UserP')
const { paperEmail, albumEmail } = require('../service/mailer')
const { userInclude } = require('../constants/includes')
const classroomsAliasses = require('../constants/classroomAliasses')
const AlbumP = require('../models/AlbumP')

const yesterday = moment().add(-1, 'days').toDate()
const today = moment().toDate()

const emailFromEntityPost = cron.schedule(
  '45 11 * * *',

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
        })

        const otherEntitiesPapers = papers.filter(
          (paper) => !classroomsAliasses.includes(paper.entity.alias)
        )

        if (otherEntitiesPapers.length > 0) {
          otherEntitiesPapers.forEach((paper) => {
            users.forEach(async (user) => {
              const { transporter, options } = paperEmail(paper, user)
              await transporter.sendMail(options, async (error, info) => {
                if (error) {
                  console.log('mail-error:', error)
                }
              })
            })
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
    const sendAlbumsNotification = async () => {
      try {
        const users = await UserP.findAll({
          include: userInclude,
        })

        const albums = await AlbumP.findAll({
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
        })

        const otherEntitiesAlbums = albums.filter(
          (album) => !classroomsAliasses.includes(album.entity.alias)
        )

        if (otherEntitiesAlbums.length > 0) {
          otherEntitiesAlbums.forEach((album) => {
            users.forEach(async (user) => {
              const { transporter, options } = albumEmail(album, user)
              await transporter.sendMail(options, async (error, info) => {
                if (error) {
                  console.log('mail-error:', error)
                }
              })
            })
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
    sendPapersNotification()
    sendAlbumsNotification()
  },
  {
    scheduled: false,
    timezone: 'Europe/Paris',
  }
)

module.exports = emailFromEntityPost
