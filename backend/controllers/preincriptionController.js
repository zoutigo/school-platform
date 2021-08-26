/* eslint-disable consistent-return */
const fs = require('fs')
const EntityP = require('../models/EntityP')
const FileP = require('../models/FileP')
const Preinscription = require('../models/Preinscription')
const PreinscriptionP = require('../models/PreinscriptionP')
const UserP = require('../models/UserP')
const {
  emailPreincriptionToUser,
  emailPreincriptionToManager,
} = require('../service/mailer')
const { deleteFile } = require('../utils/deleteFile')

const { BadRequest, NotFound, Unauthorized } = require('../utils/errors')
const {
  preinscriptionValidator,
} = require('../validators/preinscriptionValidator')

const includes = [
  {
    model: UserP,
    attributes: ['email'],
  },
  {
    model: EntityP,
    attributes: ['name'],
  },
  {
    model: FileP,
    attributes: ['filename', 'filepath'],
  },
]

module.exports.postPreinscription = async (req, res, next) => {
  const { isAdmin, id: userId } = req.user
  const { id: preinscriptionId, action } = req.query
  const filename = req.file ? req.file.filename : null
  const filepath = req.file ? req.file.path : null
  const userIsAllowed = isAdmin || userId

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(deleteFile(filepath, new BadRequest('datas missing')))
  }
  if (!userIsAllowed)
    return next(
      deleteFile(filepath, new Unauthorized('only registered are allowed '))
    )

  const errors = preinscriptionValidator(req.body)
  if (errors.length > 0) {
    return next(deleteFile(filepath, new BadRequest(errors.join())))
  }

  // check if user exits
  const user = await UserP.findOne({ where: { id: userId } })
  if (!user)
    return next(
      deleteFile(filepath, new BadRequest("l'utilisateur n'existe pas"))
    )

  const { childFirstname, childLastname, classroomAlias } = req.body

  if (action === 'create') {
    req.body.userId = userId

    if (!childFirstname || !childLastname || !classroomAlias)
      return next(
        deleteFile(
          filepath,
          new BadRequest(
            'une ou plusieurs données manquantes: childfirstname, classroomalias,'
          )
        )
      )

    // manage the classroom entity
    const classroomEntity = await EntityP.findOne({
      where: { alias: classroomAlias },
    })

    if (!classroomEntity)
      return next(
        deleteFile(filepath, new BadRequest('Mauvaie entité de classe'))
      )
    req.body.entityId = classroomEntity.id
    delete req.body.classroomAlias
    const preinscription = req.body
    const newPreinscription = PreinscriptionP.build(preinscription)

    try {
      const savedPreinscription = await newPreinscription.save()

      // manage image
      if (filepath) {
        const savedFile = await FileP.create({
          filename,
          filepath,
          filetype: 'file',
          albumId: '7ad88801-9056-4395-86dd-fd2d041bef58',
        })
        await savedPreinscription.addFile(savedFile)
      }

      if (savedPreinscription) {
        const populated = await PreinscriptionP.findOne({
          where: {
            id: savedPreinscription.id,
          },
          include: includes,
        })
        if (process.env.NODE_ENV !== 'production') {
          return res
            .status(200)
            .send({ message: 'preinscription enregistréee', datas: populated })
        }
        const { transporter: tspUser, options: optsUser } =
          emailPreincriptionToUser(populated)
        const { transporter: tspManager, options: optsManager } =
          emailPreincriptionToManager(populated)
        try {
          const mailToUser = await tspUser.sendMail(optsUser)
          const mailToManager = await tspManager.sendMail(optsManager)
          if (mailToUser && mailToManager) {
            return res.status(201).send('bien inscrit')
          }
        } catch (err) {
          return next(deleteFile(filepath, err))
        }
      }
    } catch (err) {
      return next(deleteFile(filepath, err))
    }
  } else if (action === 'update' && preinscriptionId) {
    // case update

    const currentPreinscription = await PreinscriptionP.findOne({
      where: { id: preinscriptionId },
    })
    if (!currentPreinscription) {
      if (req.file) {
        fs.unlink(currentPreinscription.filepath, (err) => {
          if (err) return next(err)
        })
      }
      return next(new BadRequest("Le chemin n'existe pas"))
    }

    const updates = {
      childFirstname:
        req.body.childFirstname || currentPreinscription.childFirstname,
      childLastname:
        req.body.childLastname || currentPreinscription.childLastname,
      status: req.body.status || currentPreinscription.status,
      verdict: req.body.verdict || currentPreinscription.verdict,
    }

    try {
      const updatedpreinscription = await PreinscriptionP.update(updates, {
        where: { id: preinscriptionId },
      })
      if (updatedpreinscription) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('preinscription correctement modifiée')
        }
        return res.status(200).send({
          message: 'preinscription correctement modifié',
          data: updatedpreinscription,
        })
      }
    } catch (err) {
      return next(deleteFile(req.file.path, err))
    }
  } else if (action === 'delete' && preinscriptionId) {
    try {
      const deletedPreinscription = await PreinscriptionP.destroy({
        where: { id: preinscriptionId },
      })

      if (deletedPreinscription) {
        fs.unlink(deletedPreinscription.filepath, (err) => {
          if (err) return next(err)
        })
        return res
          .status(200)
          .send({ message: 'preinscription correctement effacée' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(deleteFile(filepath, new BadRequest('params missing')))
  }
}

module.exports.getPreinscriptions = async (req, res, next) => {
  const errors = preinscriptionValidator(req.query)
  if (errors.length > 0) {
    return next(new BadRequest(errors.join()))
  }

  try {
    const preinscriptions = await Preinscription.find({
      where: req.query,
      include: includes,
    })

    if (preinscriptions.length < 1)
      return next(new NotFound('Pas de chemin trouvé'))
    return res.status(200).send(preinscriptions)
  } catch (err) {
    return next(err)
  }
}
