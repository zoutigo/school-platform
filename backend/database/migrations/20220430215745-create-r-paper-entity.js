module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'papers',
        'entityId',
        {
          primaryKey: false,
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              tableName: 'entities',
            },
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        },
        { t }
      )

      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('papers', 'entityId', { t })

      await t.commit()
    } catch (error) {
      await t.rollback()
      console.log('error', error)
    }
  },
}
