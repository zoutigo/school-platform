/* eslint-disable consistent-return */
const Paper = require('../models/Paper')

const { Unauthorized, BadRequest, NotFound } = require('../utils/errors')

const { paperValidator } = require('../validators/paperValidator')

module.exports.getPapers = async (req, res, next) => {
  const errors = paperValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  if (req.query.id) {
    req.query._id = req.query.id
    delete req.query.id
  }

  try {
    const papers = await Paper.find(req.query).sort({ date: -1 })
    if (papers.length < 1) return next(new NotFound('paper not found'))
    return res.status(200).send(papers)
  } catch (err) {
    return next(err)
  }
}

module.exports.postPaper = async (req, res, next) => {
  const { isAdmin, isManager, isModerator, isTeacher, _id: userId } = req.user
  const { id: paperId, action } = req.query

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }
  const userIsAllowed = isAdmin || isManager || isTeacher || isModerator
  if (!userIsAllowed)
    return next(
      new Unauthorized('only admin,teacher,manager and moderator are allowed ')
    )

  const errors = paperValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  if (action === 'create') {
    // case event creation
    const { type, title, entity, text } = req.body
    if (!type || !title || !entity || !text)
      return next(
        new BadRequest(
          'une ou plusieurs données manquante: type,title,entity,text'
        )
      )
    const paper = req.body
    paper.author = userId
    const newPaper = new Paper(paper)

    try {
      const savedPaper = await newPaper.save()
      if (savedPaper) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(201).send({ message: 'Document correctement crée' })
        }
        return res
          .status(201)
          .send({ message: 'Document correctement créee', data: savedPaper })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && paperId) {
    // case update

    const currentPaper = await Paper.findOne({ _id: paperId })
    if (!currentPaper) return next(new BadRequest("L'entité nexiste pas"))

    try {
      const updatedPaper = await Paper.findOneAndUpdate(
        { _id: paperId },
        req.body,
        {
          returnOriginal: false,
        }
      )
      if (updatedPaper) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send('Document correctement modifié')
        }
        return res.status(200).send({
          message: 'Document correctement modifié',
          data: updatedPaper,
        })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'delete' && paperId) {
    try {
      const deletedPaper = await Paper.findOneAndDelete({ _id: paperId })
      if (deletedPaper) {
        return res.status(200).send({ message: 'paper deleted successfully' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(new BadRequest('action or paper id missing'))
  }
}
