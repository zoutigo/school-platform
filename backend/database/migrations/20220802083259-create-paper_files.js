const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'paper_files',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          uuid: {
            type: Sequelize.UUID,
            defaultValue: uuidv4(),
          },
          paperId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'papers',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          fileId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'files',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
        { t }
      )
      await t.commit()
    } catch (error) {
      console.log('error', error)
      await t.rollback()
    }
  },
  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.dropTable('paper_files')
    } catch (error) {
      await t.rollback()
      console.log('error', error)
    }
  },
}
