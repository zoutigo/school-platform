module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'albums',
        'entityId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'entities',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )

      await queryInterface.addColumn(
        'suggestions',
        'userId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await queryInterface.addColumn(
        'mails',
        'userId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await queryInterface.addColumn(
        'preinscriptions',
        'userId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
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
      console.log('----------start reverting')

      await queryInterface.removeColumn('suggestions', 'userId', { t })

      console.log('----------suggestion ok')

      await queryInterface.removeColumn('albums', 'entityId', { t })
      console.log('----------album ok')

      await queryInterface.removeColumn('mails', 'userId', { t })
      console.log('----------mail ok')

      await queryInterface.removeColumn('preinscriptions', 'userId', { t })
      console.log('----------preinscription ok')

      await t.commit()
    } catch (error) {
      await t.rollback()
      console.log('error', error)
    }
  },
}
