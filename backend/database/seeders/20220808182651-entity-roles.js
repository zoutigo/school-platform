const { QueryTypes } = require('@sequelize/core')
const rawRoles = require('../../constants/rawRoles')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      const entities = await queryInterface.sequelize.query(
        ` SELECT * FROM entities`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const roles = await queryInterface.sequelize.query(
        ` SELECT * FROM roles`,
        {
          type: QueryTypes.SELECT,
        }
      )

      // const entitiesRoles = entities
      //   .map((entity) => {
      //     const entityRole = rawRoles.find(
      //       ({ slug }) => slug.indexOf(entity.alias) > 0
      //     )

      //     return {
      //       entityUuid: entity.uuid,
      //       roleSlug: entityRole ? entityRole.slug : null,
      //     }
      //   })
      //   .filter(({ roleSlug }) => roleSlug !== null)
      //   .map(({ entityUuid, roleSlug }) => {
      //     const frole = roles.find((role) => role.slug === roleSlug)
      //     return {
      //       entityUuid,
      //       roleId: frole.id,
      //     }
      //   })

      // await Promise.all(
      //   entitiesRoles.map(async ({ entityUuid, roleId }) => {
      //     await queryInterface.sequelize.query(` SELECT * FROM entities`, {
      //       type: QueryTypes.SELECT,
      //     })
      //     await queryInterface.bulkUpdate(
      //       'entities',
      //       {
      //         roleId,
      //       },
      //       {
      //         uuid: entityUuid,
      //       },
      //       { t }
      //     )
      //   })
      // )

      const roleEntities = roles
        .map((rol) => {
          const roleEntity = entities.find(
            (ent) => rol.slug.indexOf(ent.alias) > 0
          )
          return {
            roleUuid: rol.uuid,
            entityId: roleEntity ? roleEntity.id : null,
          }
        })
        .filter(({ entityId }) => entityId !== null)

      await Promise.all(
        roleEntities.map(async ({ roleUuid, entityId }) => {
          await queryInterface.sequelize.query(` SELECT * FROM roles`, {
            type: QueryTypes.SELECT,
          })
          await queryInterface.bulkUpdate(
            'roles',
            {
              entityId,
            },
            {
              uuid: roleUuid,
            },
            { t }
          )
        })
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
      // await queryInterface.bulkUpdate(
      //   'entities',
      //   {
      //     roleId: null,
      //   },
      //   {},
      //   { t }
      // )
      await queryInterface.bulkUpdate(
        'roles',
        {
          entityId: null,
        },
        {},
        { t }
      )
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
