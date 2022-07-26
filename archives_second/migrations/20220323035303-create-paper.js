module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('papers', {
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
      type: {
        type: Sequelize.DataTypes.ENUM,
        values: [
          'article',
          'activite',
          'parent-info',
          'newsletter',
          'menu',
          'breve',
          'info',
          'fourniture',
        ],
        allowNull: false,
      },
      title: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      content: {
        type: Sequelize.DataTypes.STRING(10000),
      },
      classe_fourniture: {
        type: Sequelize.DataTypes.STRING(30),
      },
      isPrivate: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      },
      date: {
        type: Sequelize.DataTypes.STRING(14),
        defaultValue: new Date().getTime(),
      },
      startdate: {
        type: Sequelize.DataTypes.STRING(14),
      },
      enddate: {
        type: Sequelize.DataTypes.STRING(14),
      },
      files: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
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
    await queryInterface.dropTable('papers')
  },
}
