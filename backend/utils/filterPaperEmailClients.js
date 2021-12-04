const moment = require('moment')
const { Op } = require('sequelize')
const classroomsAliasses = require('../constants/classroomAliasses')
const { userInclude } = require('../constants/includes')
const EntityP = require('../models/EntityP')
const PaperP = require('../models/PaperP')
const UserP = require('../models/UserP')
const { paperEmail } = require('../service/mailer')

const yesterday = moment().add(-1, 'days').toDate()
const today = moment().toDate()

const filterPaperEmailClients = async (variant) => {
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

    // papers only for classrooms
    const filteredPapers = papers.filter(
      (paper) =>
        (!classroomsAliasses.includes(paper.entity.alias) &&
          variant !== 'classroom') ||
        classroomsAliasses.includes(paper.entity.alias)
    )

    if (filteredPapers.length > 0) {
      filteredPapers.forEach(async (paper) => {
        const parents =
          variant !== 'classroom'
            ? users
            : users.filter((user) => {
                const userEntities = user.entities
                  ? user.entities.map((entity) => entity.alias)
                  : []
                return (
                  userEntities.length > 0 &&
                  userEntities.includes(paper.entity.alias)
                )
              })

        // console.log(
        //   variant,
        //   paper.entity.alias,
        //   paper.title,
        //   parents.map((parent) => parent.email)
        // )

        await Promise.all(
          parents.map(async (parent) => {
            const { transporter, options } = paperEmail(paper, parent)
            await transporter.sendMail(options, async (error, info) => {
              if (error) {
                console.log('mail-error:', error)
              }
            })
          })
        )
      })
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = filterPaperEmailClients
