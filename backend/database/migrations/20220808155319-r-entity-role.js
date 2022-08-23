module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      // await queryInterface.addColumn(
      //   'entities',
      //   'roleId',
      //   {
      //     primaryKey: false,
      //     type: Sequelize.INTEGER,
      //     allowNull: true,
      //     references: {
      //       model: {
      //         tableName: 'roles',
      //         key: 'id',
      //       },
      //       onUpdate: 'CASCADE',
      //       onDelete: 'SET NULL',
      //     },
      //   },
      //   { t }
      // )
      await queryInterface.addColumn(
        'roles',
        'entityId',
        {
          primaryKey: false,
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              tableName: 'entities',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
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
      // await queryInterface.removeColumn('entities', 'roleId', { t })
      await queryInterface.removeColumn('roles', 'entityId', { t })

      await t.commit()
    } catch (error) {
      await t.rollback()
    }
  },
}
