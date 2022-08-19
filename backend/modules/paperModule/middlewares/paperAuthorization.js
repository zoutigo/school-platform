const { role, entity } = require('../../../database/models')
const deleteFilesStorageService = require('../../../globalServices/uploads/deleteFilesStorageService')
const errorLogger = require('../../../utils/errorLogger')
const { Unauthorized } = require('../../../utils/errors')

const paperAuthorization = async (req, res, next) => {
  try {
    const { entityUuid } = req.body
    const requester = req.user

    // local role

    const requestedEntity = await entity.findOne({
      where: { uuid: entityUuid },
      include: [
        {
          model: role,
        },
      ],
    })

    const requesterRoles = requester.roles.map(
      ({ dataValues: { slug } }) => slug
    )

    const entityRoles = requestedEntity.roles.map((rol) => rol.dataValues.slug)

    const validRoles = requesterRoles.filter((rou) => entityRoles.includes(rou))

    const isUserRoleAllowed = validRoles.length > 0

    // // super role

    const isAllowedSuperRole =
      requesterRoles.includes('moderateur') ||
      requesterRoles.includes('manager') ||
      requesterRoles.includes('admin')

    const isAllowed = isUserRoleAllowed || isAllowedSuperRole

    if (!isAllowed) {
      // deleteFilesStorageService(req.files)

      return next(
        new Unauthorized(
          `Vous n'avez pas les droits pour modidier cette ressource`
        )
      )
    }

    return next()
  } catch (error) {
    // deleteFilesStorageService(req.files)

    errorLogger('Paper Authorisation Error', error)

    return next(error)
  }
}

module.exports = paperAuthorization
