const { pageRawContent } = require('../../constants/pageRawContent')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      uuid: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      alias: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.DataTypes.STRING(10000),
        defaultValue: JSON.stringify(pageRawContent),
      },
      entityId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'entities',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pages')
  },
}
