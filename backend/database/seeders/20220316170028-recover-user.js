const UserP = require('../../models/UserP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const oldUsers = await UserP.findAll()

    const newUsers = oldUsers.map((user) => ({
      lastname: user.lastname,
      firstname: user.firstname,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isModerator: user.isModerator,
      isTeacher: user.isTeacher,
      isVerified: user.isVerified,
      password: user.password,
      emailToken: user.emailToken,
      losspassToken: user.losspassToken,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))

    await queryInterface.bulkInsert('users', newUsers, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
