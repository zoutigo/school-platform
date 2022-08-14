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
      await queryInterface.addColumn(
        'files',
        'albumId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'albums',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await queryInterface.addColumn(
        'files',
        'paperId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'papers',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await queryInterface.addColumn(
        'files',
        'cardId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'cards',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        },
        { t }
      )
      await queryInterface.addColumn(
        'files',
        'preinscriptionId',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'preinscriptions',
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
      await queryInterface.removeColumn('suggestions', 'userId', { t })
      await queryInterface.removeColumn('albums', 'entityId', { t })
      await queryInterface.removeColumn('mails', 'userId', { t })
      await queryInterface.removeColumn('preinscriptions', 'userId', { t })
      await queryInterface.removeColumn('files', 'albumId', { t })
      await queryInterface.removeColumn('files', 'paperid', { t })
      await queryInterface.removeColumn('files', 'cardId', { t })
      await queryInterface.removeColumn('files', 'preinscriptionId', { t })

      await t.commit()
    } catch (error) {
      await t.rollback()
    }
  },
}
