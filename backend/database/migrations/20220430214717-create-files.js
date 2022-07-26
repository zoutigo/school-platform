const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'files',
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
          albumId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'albums',
              key: 'id',
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            },
          },
          paperId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'papers',
              key: 'id',
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            },
          },
          cardId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'cards',
              key: 'id',
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            },
          },

          filename: {
            type: Sequelize.DataTypes.STRING(200),
            allowNull: false,
          },
          filepath: {
            type: Sequelize.DataTypes.STRING(200),
            allowNull: false,
          },

          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date(),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date(),
          },
        },
        { t }
      )
      await t.commit()
    } catch (error) {
      await t.rollback()
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('files')
  },
}
