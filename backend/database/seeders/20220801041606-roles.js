// const UserRoles = require('../../models/UserRoles')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    const rawRoles = [
      {
        name: 'enseignant ps',
        desc: 'enseigner en classe de petite section',
      },
      {
        name: 'enseignant ms',
        desc: 'enseigner en classe de moyenne section',
      },
      {
        name: 'enseignant gs',
        desc: 'enseigner en classe de grande section',
      },
      {
        name: 'enseignant cp',
        desc: 'enseigner en classe de cp',
      },
      {
        name: 'enseignant ce1',
        desc: 'enseigner en classe de ce1',
      },
      {
        name: 'enseignant ce2',
        desc: 'enseigner en classe de ce2',
      },
      {
        name: 'enseignant cm1',
        desc: 'enseigner en classe de cm1',
      },
      {
        name: 'enseignant cm2',
        desc: 'enseigner en classe de cm2',
      },
      {
        name: 'enseignant adaptation',
        desc: 'enseigner en classe de adaptation',
      },
      {
        name: 'admin',
        desc: 'administrer le site',
      },
      {
        name: 'manager',
        desc: 'gerer les informations du site',
      },
      {
        name: 'moderateur',
        desc: 'animer le site',
      },
      {
        name: 'membre apel',
        desc: 'animer la section apel du site',
      },
      {
        name: 'membre ogec',
        desc: 'animer la section ogec du site',
      },
      {
        name: 'animateur pastoral',
        desc: 'animer la section pastorale du site',
      },
      {
        name: 'animateur cantine',
        desc: 'animer la section cantine du site',
      },
    ]

    const roles = rawRoles.map((role) => ({
      ...role,
      uuid: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    await queryInterface.bulkInsert('roles', roles, { t })
    await t.commit()
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('roles', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
    }
  },
}
