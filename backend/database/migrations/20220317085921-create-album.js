module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('albums', {
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
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      alias: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        defaulValue: 'Il faut une description',
      },
      isActive: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaulValue: true,
      },
      isPrivate: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaulValue: true,
      },
      entityId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'entities',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
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
    await queryInterface.dropTable('albums')
  },
}
