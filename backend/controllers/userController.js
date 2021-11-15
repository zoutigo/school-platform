/* eslint-disable consistent-return */
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const { emailConfirmMail, emailLosspass } = require('../service/mailer')
const { Unauthorized, BadRequest, TokenInvalid } = require('../utils/errors')
const { generateValidationToken } = require('../utils/generateValidationToken')
const { generateToken } = require('../utils/generatetoken')
const { losspassTokenVerify } = require('../utils/tokenverify')

const { userValidator } = require('../validators/userValidator')
const UserP = require('../models/UserP')
const RoleP = require('../models/RoleP')
const EntityP = require('../models/EntityP')
const { userInclude } = require('../constants/includes')
const { userAttributes } = require('../constants/attributes')

module.exports.registerUser = async (req, res, next) => {
  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('Some fields are missing'))

  const mandatorydFields = ['email', 'password', 'passwordConfirm']

  const submittedFields = mandatorydFields.filter(
    (field) => Object.keys(req.body).includes(field) === true
  )
  if (!(submittedFields.length === mandatorydFields.length))
    return next(new BadRequest('One or more expected field is missing'))

  const { password, passwordConfirm, email } = req.body
  if (!(password === passwordConfirm))
    return next(new BadRequest('Passwords submitted are different'))

  const errors = userValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  // check if email exist in database
  const checkedEmail = await UserP.findOne({ where: { email } })
  if (checkedEmail)
    return next(new BadRequest(`cet email est deja détenu par un utilisateur`))

  // password hash
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // email token

  const user = {
    email,
    password: hashedPassword,
    emailToken: crypto.randomBytes(64).toString('hex'),
  }

  try {
    const newUser = await UserP.create(user)
    if (!newUser) return next(new BadRequest('une erreur est survenue'))

    // if (process.env.NODE_ENV === 'development')
    //   return res.status(201).send({ message: 'compte correctement crée' })

    // if (process.env.NODE_ENV === 'test')
    //   return res
    //     .status(201)
    //     .send(
    //       'Votre compte est correctement crée. Un mail de validation vous a été adressé'
    //     )
    const { transporter, options } = emailConfirmMail(newUser)

    await transporter.sendMail(options, (error, info) => {
      if (error) {
        return next(error)
      }
      return res
        .status(201)
        .send(
          'Votre compte est correctement crée. Un mail de validation vous a été adressé'
        )
    })
  } catch (err) {
    return next(err)
  }
}

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new BadRequest('password or email missing'))
  }

  const errors = userValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  // check if email exists
  const userVerified = await UserP.findOne({
    where: { email },
    include: userInclude,
  })
  if (!userVerified)
    return next(new BadRequest('email ou mot de passs invalide'))

  const { isVerified } = userVerified

  if (!isVerified)
    return next(
      new BadRequest(
        'Veillez valider votre compte grace au mail qui vous a été transmis lors de votre inscription'
      )
    )
  // check password
  const passwordVerified = await bcrypt.compare(password, userVerified.password)
  if (!passwordVerified)
    return next(new BadRequest('email ou mot de pass invalide'))

  return res
    .status(200)
    .header('x-access-token', generateToken(userVerified))
    .send({ message: 'connection effectuée avec succès' })
}
module.exports.updateUser = async (req, res, next) => {
  const { id: toUpdateId } = req.query

  const {
    id: requesterId,
    isAdmin: requesterIsAdmin,
    isManager: requesterIsManager,
    isModerator: requesterIsModerator,
  } = req.user

  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('No datas to update'))

  const errors = userValidator(req.body)
  if (errors.length > 0) return next(new BadRequest(errors.join()))

  // check if user exist
  const toUpdateuser = await UserP.findOne({
    where: { id: toUpdateId },
    include: userInclude,
  })
  if (!toUpdateuser)
    return next(new BadRequest('user to update does not exist'))

  const isOwner = Number(toUpdateId) === requesterId

  const {
    lastname,
    firstname,
    gender,
    isManager,
    isModerator,
    isTeacher,
    password,
    newPassword,
    newPasswordConfirm,
    roles,
    phone,
    childrenClasses,
  } = req.body

  if (childrenClasses) {
    if (isOwner) {
      const entities = await EntityP.findAll({
        attributes: ['id', 'name', 'alias'],
      })

      const newEntitiesIds = childrenClasses.map((classroomAlias) => {
        const { id: classroomEntityId } = entities.find(
          (entity) => classroomAlias === entity.alias
        )
        return classroomEntityId
      })

      if (
        JSON.stringify(newEntitiesIds) !== JSON.stringify(toUpdateuser.entities)
      ) {
        // destroy previous associations
        const previousEntities = toUpdateuser.entities
        if (previousEntities) {
          previousEntities.forEach(async (prevEntity) => {
            const oldEntity = await EntityP.findOne({
              where: { id: prevEntity.id },
            })
            await toUpdateuser.removeEntity(oldEntity)
          })
        }

        // create new associations
        newEntitiesIds.forEach(async (newEntityId) => {
          const newEntity = await EntityP.findOne({
            where: { id: newEntityId },
          })
          await toUpdateuser.addEntity(newEntity)
        })
      }
    } else {
      return next(new Unauthorized('only the owner can modify its entities'))
    }
  }

  if (lastname && lastname !== 'undefined') {
    if (isOwner) {
      if (!(lastname === toUpdateuser.lastname)) {
        toUpdateuser.lastname = lastname
      }
    } else {
      return next(new Unauthorized('only the owner can modify its lastname'))
    }
  }

  //  roles cases still to be done
  if (firstname) {
    if (isOwner) {
      if (!(firstname === toUpdateuser.firstname)) {
        toUpdateuser.firstname = firstname
      }
    } else {
      return next(new Unauthorized('only the owner can modify its firstname'))
    }
  }

  if (gender) {
    if (isOwner) {
      if (!(gender === toUpdateuser.gender)) {
        toUpdateuser.gender = gender
      }
    } else {
      return next(new Unauthorized('only the owner can modify its gender'))
    }
  }
  if (phone) {
    if (isOwner) {
      if (!(phone === toUpdateuser.phone)) {
        toUpdateuser.phone = phone
      }
    } else {
      return next(new Unauthorized('only the owner can modify its phone'))
    }
  }

  if (password) {
    if (isOwner) {
      const { password: initialPassword } = toUpdateuser
      if (!password || !newPasswordConfirm || !newPassword)
        return next(new BadRequest('Veillez saisir les mots de pass demandés'))

      if (newPassword !== newPasswordConfirm)
        return next(
          new BadRequest('Les mots de pass saisis ne sont pas identiques')
        )

      const passwordVerified = await bcrypt.compare(password, initialPassword)
      if (!passwordVerified)
        return next(
          new BadRequest("Votre mot de pass initial n'est pas correct")
        )

      // pass should be crypted
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)
      toUpdateuser.password = hashedPassword
    } else {
      return next(new Unauthorized('only the owner can modify'))
    }
  }

  if (isManager) {
    if (!toUpdateuser.isVerified)
      return next(
        new BadRequest("Le mail de cet utilisateur n'est pas vérifié .")
      )
    if (requesterIsAdmin) {
      if (!(isManager === toUpdateuser.isManager)) {
        toUpdateuser.isManager = isManager
      }
    } else {
      return next(new Unauthorized('only admin can define manager'))
    }
  }

  if (isModerator) {
    if (!toUpdateuser.isVerified)
      return next(
        new BadRequest("Le mail de cet utilisateur n'est pas vérifié .")
      )
    if (requesterIsAdmin || requesterIsManager) {
      if (!(isModerator === toUpdateuser.isModerator)) {
        toUpdateuser.isModerator = isModerator
      }
    } else {
      return next(
        new Unauthorized('only manager or admin can define moderator')
      )
    }
  }

  if (isTeacher) {
    if (!toUpdateuser.isVerified)
      return next(
        new BadRequest("Le mail de cet utilisateur n'est pas vérifié .")
      )
    if (requesterIsAdmin || requesterIsManager || requesterIsModerator) {
      if (!(isTeacher === toUpdateuser.isTeacher)) {
        toUpdateuser.isTeacher = isTeacher
      }
    } else {
      return next(new Unauthorized('only manager or admin can define teacher'))
    }
  }
  /// to be reworked
  if (roles) {
    if (!toUpdateuser.isVerified)
      return next(
        new BadRequest("Le mail de cet utilisateur n'est pas vérifié .")
      )
    if (
      !toUpdateuser.firstname ||
      !toUpdateuser.lastname ||
      !toUpdateuser.gender
    )
      return next(
        new BadRequest(
          "Cet utilisateur n'a pas renseigné ses informations personelles : nom, prénom, genre"
        )
      )

    if (requesterIsAdmin || requesterIsManager || requesterIsModerator) {
      // destroy previous associations
      const previousRoles = toUpdateuser.roles
      if (previousRoles && previousRoles.length > 0) {
        previousRoles.forEach(async (prevRole) => {
          const oldRole = await RoleP.findOne({
            where: { id: prevRole.id },
          })
          await toUpdateuser.removeRole(oldRole)
        })
      }

      // create new associations
      roles.forEach(async (newRoleId) => {
        const newRole = await RoleP.findOne({
          where: { id: newRoleId },
        })
        const update = await toUpdateuser.addRole(newRole)

        if (!update) {
          console.log('erroron:', newRole.name)
        } else {
          console.log('successon', newRole.name)
        }
      })
    } else {
      return next(new Unauthorized('only manager or admin can define teacher'))
    }
  }

  try {
    const savedModifiedUser = await toUpdateuser.save()

    if (!savedModifiedUser) return next()

    const userId = isOwner ? toUpdateId : requesterId
    const user = await UserP.findOne({
      where: { id: userId },
      include: userInclude,
      attributes: userAttributes,
    })
    const message = { message: 'Modification correctement effectuée' }

    return res
      .status(200)
      .header('x-access-token', generateToken(user))
      .send(message)
  } catch (err) {
    return next(err)
  }
}

module.exports.listUsers = async (req, res, next) => {
  if (req.query) {
    const errors = userValidator(req.query)
    if (errors.length > 0) return next(new BadRequest(errors.join()))
  }

  try {
    const users = await UserP.findAll({
      where: req.query,
      include: userInclude,
      attributes: userAttributes,
    })

    if (!users || users.length < 1)
      return res.status(204).send({ message: 'no user found' })
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

module.exports.viewUser = async (req, res, next) => {
  const { id } = req.params
  const errors = userValidator({ id: id })
  if (errors.length > 0) return next(new BadRequest(errors))

  const user = await UserP.findOne({
    where: { id },
    include: userInclude,
    attributes: userAttributes,
  })

  if (!user) return next(new BadRequest('no user found with that id'))

  return res.status(200).send(user)
}

module.exports.userEmail = async (req, res, next) => {
  const { email } = req.body
  if (!email) {
    return next(new BadRequest('email is necessary'))
  }
  const errors = userValidator({ email: email })
  if (errors.length > 0) return next(new BadRequest(errors))

  try {
    const user = await UserP.findOne({ where: req.body })
    if (!user) return res.status(204).send('no user')
    return res.status(200).send('user exist')
  } catch (err) {
    return next(err)
  }
}

module.exports.verifyEmail = async (req, res, next) => {
  try {
    const user = await UserP.findOne({ where: { emailToken: req.query.token } })
    if (!user) {
      const errorMessage = `Le jeton n'est plus valide. Contactez le support technique`
      return res.redirect(
        `/private/identification/register?status=error&message=${errorMessage}`
      )
    }

    user.emailToken = null
    user.isVerified = true
    await user.save()
    const successMessage = `Votre email a bien été validé . vous pouvez desormais vous connecter et profiter des actulités de l'école saint augustin`
    return res.redirect(
      `/private/identification/login?status=success&message=${successMessage}`
    )
  } catch (err) {
    return next(new BadRequest(err))
  }
}

module.exports.userLosspass = async (req, res, next) => {
  const { action } = req.query

  const { email, password, passwordConfirm, token } = req.body

  if (!action) return next(new BadRequest('Please provide action'))

  if (action === 'losspass_checkemail') {
    const user = await UserP.findOne({
      where: { email },
      include: [RoleP, EntityP],
    })

    if (!user)
      return next(
        new BadRequest(" Cet email n'est pas connu dans notre base données")
      )
    const losspassToken = generateValidationToken(user)
    user.losspassToken = losspassToken

    const { transporter, options } = await emailLosspass(user)

    try {
      await user.save()
      const mailToUser = await transporter.sendMail(options)
      if (mailToUser)
        return res.status(200).send({
          message: 'Demande prise en compte. Un mail vous a été adressé',
        })
    } catch (err) {
      return next(err)
    }
  }
  if (action === 'losspass_updatepass') {
    const { error, id: userId } = await losspassTokenVerify(token)

    if (error) return next(new TokenInvalid(error))

    const user = await UserP.findOne({
      where: { id: userId },
      include: [RoleP, EntityP],
    })

    if (!user.losspassToken || user.losspassToken !== token)
      return next(
        new BadRequest(
          'Vous devez amorcer la procédure de recuperation du mot de pass en allant sur MONCOMPTE/PASSPERDU'
        )
      )

    if (!password || !passwordConfirm)
      return next(new BadRequest('Veillez saisir les mots de pass demandés'))

    if (password !== passwordConfirm)
      return next(new BadRequest('Les mots de pass doivent etre identiques'))

    const errors = userValidator({ password, passwordConfirm })
    if (errors.length > 0) return next(new BadRequest(errors.join()))

    try {
      // pass should be crypted
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const modifiedUser = await UserP.update(
        { password: hashedPassword, losspassToken: null },
        {
          where: { id: userId },
        }
      )

      if (modifiedUser)
        return res.status(200).send({
          message:
            'Le mot de pass a été  reinitialisé correctement. Dans 3 secondes , vous allez etre redirigés vers la page de login.',
        })
    } catch (err) {
      return next(new BadRequest(err))
    }
  }
  return next(new BadRequest('il y a une erreur'))
}
