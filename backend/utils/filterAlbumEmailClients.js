const moment = require('moment')
const { Op } = require('sequelize')
const classroomsAliasses = require('../constants/classroomAliasses')
const { userInclude } = require('../constants/includes')
const AlbumP = require('../models/AlbumP')
const EntityP = require('../models/EntityP')
const UserP = require('../models/UserP')
const { albumEmail } = require('../service/mailer')

const yesterday = moment().add(-1, 'days').toDate()
const today = moment().toDate()

const filterAlbumEmailClients = async (variant) => {
  try {
    const users = await UserP.findAll({
      where: { isVerified: true },
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

    // const filteredAlbums = albums.filter(
    //   (album) =>
    //     (variant === 'classroom' &&
    //       classroomsAliasses.includes(album.entity.alias)) ||
    //     !classroomsAliasses.includes(album.entity.alias)
    // )

    const filteredAlbums =
      variant === 'classroom'
        ? albums.filter((album) =>
            classroomsAliasses.includes(album.entity.alias)
          )
        : albums.filter(
            (album) => !classroomsAliasses.includes(album.entity.alias)
          )

    if (filteredAlbums.length > 0) {
      const [dailyAlbum, ...rest] = filteredAlbums

      const parents =
        variant !== 'classroom'
          ? users
          : users.filter((user) => {
              const userEntities = user.entities
                ? user.entities.map((entity) => entity.alias)
                : []
              return (
                userEntities.length > 0 &&
                userEntities.includes(dailyAlbum.entity.alias)
              )
            })

      // console.log(
      //   variant,
      //   dailyAlbum.entity.alias,
      //   dailyAlbum.name,
      //   parents.map((parent) => parent.email)
      // )

      await Promise.all(
        parents.map(async (parent) => {
          const { transporter, options } = albumEmail(dailyAlbum, parent)
          await transporter.sendMail(options, async (error, info) => {
            if (error) {
              console.log('mail-error:', error)
            }
          })
        })
      )
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = filterAlbumEmailClients
