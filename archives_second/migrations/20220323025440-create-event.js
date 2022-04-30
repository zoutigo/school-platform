module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
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
      content: {
        type: Sequelize.DataTypes.STRING(15000),
        allowNull: false,
      },
      place: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      date: {
        type: Sequelize.DataTypes.STRING(13),
        allowNull: false,
      },
      isPrivate: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('events')
  },
}
