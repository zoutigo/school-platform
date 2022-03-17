module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'dialogs',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          text: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          startdate: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          enddate: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        { transaction }
      )
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dialogs')
  },
}
