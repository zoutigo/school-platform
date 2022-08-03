const { v4: uuidv4 } = require('uuid')
const UserP = require('../../models/UserP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const oldUsers = await UserP.findAll()

    const users = oldUsers.map(({ dataValues }) => ({
      uuid: uuidv4(),
      lastname: dataValues.lastname || 'DUPONT',
      firstname: dataValues.firstname || 'EMILE',
      gender: dataValues.gender === 'choisir' ? 'monsieur' : dataValues.gender,
      email: dataValues.email,
      phone: dataValues.phone,
      isVerified: dataValues.isVerified,
      password: dataValues.password,
      emailToken: dataValues.emailToken,
      losspassToken: dataValues.losspassToken,
      createdAt: dataValues.createdAt,
      updatedAt: dataValues.updatedAt,
    }))

    await queryInterface.bulkInsert('users', users, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  },
}
