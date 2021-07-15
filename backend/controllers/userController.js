/* eslint-disable consistent-return */
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const Entity = require('../models/Entity')
const User = require('../models/User')
const { emailConfirmMail } = require('../service/mailer')
const { Unauthorized, BadRequest } = require('../utils/errors')
const { generateToken } = require('../utils/generatetoken')
const { updateArray } = require('../utils/updateArray')

const { userValidator } = require('../validators/userValidator')

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
  const checkedEmail = await User.findOne({ email })
  if (checkedEmail) return next(new BadRequest(`email already exists`))

  // password hash
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // email token

  const user = new User({
    email,
    password: hashedPassword,
    emailToken: crypto.randomBytes(64).toString('hex'),
  })

  try {
    const newUser = await user.save()
    if (!newUser) return next(new BadRequest('une erreur est survenue'))

    const { transporter, options } = emailConfirmMail(newUser)

    if (process.env.NODE_ENV === 'test')
      return res
        .status(201)
        .send(
          'Votre compte est correctement crée. Un mail de validation vous a été adressé'
        )

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
  const userVerified = await User.findOne({ email: email }).populate('roles')
  if (!userVerified) return next(new BadRequest('invalid email or password'))

  // check password
  const passwordVerified = await bcrypt.compare(password, userVerified.password)
  if (!passwordVerified)
    return next(new BadRequest('invalid email or password'))

  return res
    .status(200)
    .header('x-access-token', generateToken(userVerified))
    .send('successful login')
}
module.exports.updateUser = async (req, res, next) => {
  const { id: toUpdateId, roleAction } = req.query
  const {
    _id: requesterId,
    isAdmin: requesterIsAdmin,
    isManager: requesterIsManager,
    isModerator: requesterIsModerator,
  } = req.user

  if (Object.keys(req.body).length < 1)
    return next(new BadRequest('No datas to update'))

  const errors = userValidator(req.body)
  if (errors.length > 0) return next(new BadRequest(errors.join()))

  // check if user exist
  const toUpdateuser = await User.findOne({ _id: toUpdateId })
  if (!toUpdateuser)
    return next(new BadRequest('user to update does not exist'))

  const isOwner = toUpdateId === requesterId

  const newUserDatas = {}

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
    role,
    phone,
    childrenClasses,
  } = req.body

  if (childrenClasses) {
    if (isOwner) {
      if (
        JSON.stringify(childrenClasses) !==
        JSON.stringify(toUpdateuser.childrenClasses)
      ) {
        // fetch entities

        const classrooms = await Promise.all(
          childrenClasses.map(async (classroom) => {
            const entity = await Entity.findOne({ alias: classroom })
            return entity._id
          })
        )
        newUserDatas.childrenClasses = classrooms
      }
    } else {
      return next(new Unauthorized('only the owner can modify its lastname'))
    }
  }

  if (lastname) {
    if (isOwner) {
      if (!(lastname === toUpdateuser.lastname)) {
        newUserDatas.lastname = lastname
      }
    } else {
      return next(new Unauthorized('only the owner can modify its lastname'))
    }
  }

  //  roles cases still to be done
  if (firstname) {
    if (isOwner) {
      if (!(firstname === toUpdateuser.firstname)) {
        newUserDatas.firstname = firstname
      }
    } else {
      return next(new Unauthorized('only the owner can modify its lastname'))
    }
  }

  if (gender) {
    if (isOwner) {
      if (!(gender === toUpdateuser.gender)) {
        newUserDatas.gender = gender
      }
    } else {
      return next(new Unauthorized('only the owner can modify its lastname'))
    }
  }
  if (phone) {
    if (isOwner) {
      if (!(phone === toUpdateuser.phone)) {
        newUserDatas.phone = phone
      }
    } else {
      return next(new Unauthorized('only the owner can modify its lastname'))
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
      newUserDatas.password = hashedPassword
    } else {
      return next(new Unauthorized('only the owner can modify'))
    }
  }

  if (isManager) {
    if (requesterIsAdmin) {
      if (!(isManager === toUpdateuser.isManager)) {
        newUserDatas.isManager = isManager
      }
    } else {
      return next(new Unauthorized('only admin can define manager'))
    }
  }

  if (isModerator) {
    if (requesterIsAdmin || requesterIsManager) {
      if (!(isModerator === toUpdateuser.isModerator)) {
        newUserDatas.isModerator = isModerator
      }
    } else {
      return next(
        new Unauthorized('only manager or admin can define moderator')
      )
    }
  }

  if (isTeacher) {
    if (requesterIsAdmin || requesterIsManager || requesterIsModerator) {
      if (!(isTeacher === toUpdateuser.isTeacher)) {
        newUserDatas.isTeacher = isTeacher
      }
    } else {
      return next(new Unauthorized('only manager or admin can define teacher'))
    }
  }

  if (role) {
    if (requesterIsAdmin || requesterIsManager || requesterIsModerator) {
      if (!roleAction) return next(new BadRequest('missing roleAction'))

      newUserDatas.roles = updateArray(toUpdateuser.roles, roleAction, role)
    } else {
      return next(new Unauthorized('only manager or admin can define teacher'))
    }
  }

  // insersion in database

  if (Object.keys(newUserDatas).length < 1)
    return next(new BadRequest('something wrong happened'))
  try {
    const savedModifiedUser = await User.findOneAndUpdate(
      { _id: toUpdateId },
      newUserDatas,
      { returnOriginal: false }
    )
    if (!savedModifiedUser) return next()
    const message = { message: 'Modification correctement effectuée' }
    if (isOwner)
      return res
        .status(200)
        .header('x-access-token', generateToken(savedModifiedUser))
        .send(message)

    return res
      .status(200)
      .header('x-access-token', generateToken(req.user))
      .send(message)
  } catch (err) {
    return next(err)
  }
}

module.exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('_id email lastname firstname gender')
      .populate('roles')
    if (!users) return res.status(204).send('no user found')
    return res.status(200).send(users)
  } catch (err) {
    return next(err)
  }
}

module.exports.viewUser = async (req, res, next) => {
  const { id } = req.params
  const errors = userValidator({ _id: id })
  if (errors.length > 0) return next(new BadRequest(errors))

  const user = await User.findOne({ _id: id })
    .select(
      '_id firstname lastname gender isAdmin isManager isTeacher childrenClasses roles email phone'
    )
    .populate('roles')
    .populate('childrenClasses')
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
    const user = await User.findOne(req.body)
    if (!user) return res.status(204).send('no user')
    return res.status(200).send('user exist')
  } catch (err) {
    return next(err)
  }
}

module.exports.verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ emailToken: req.query.token })
    if (!user) {
      const errorMessage = `Le jeton n'est plus valide. Contactez le support technique`
      return res.redirect(`/register?status=error&message=${errorMessage}`)
    }

    user.emailToken = null
    user.isverified = true
    await user.save()
    const successMessage = `Votre email a bien été validé . vous pouvez desormais vous connecter et profiter des actulités de l'école saint augustin`
    return res.redirect(`/login?status=success&message=${successMessage}`)
  } catch (err) {
    return next(new BadRequest(err))
  }
}
