/* eslint-disable consistent-return */
const Page = require('../models/Page')

const { BadRequest, Unauthorized, NotFound } = require('../utils/errors')
const { pageValidator } = require('../validators/pageValidator')

module.exports.postPage = async (req, res, next) => {
  const { isAdmin, isManager, isModerator } = req.user
  const { id: pageId, action } = req.query

  if (Object.keys(req.body).length < 1 && action !== 'delete') {
    return next(new BadRequest('datas missing'))
  }

  const userIsAllowed = isAdmin || isManager || isModerator
  if (!userIsAllowed)
    return next(
      new Unauthorized(
        "Seuls lemanager, l'admin et le modérateur peuvent modifier ou creer une page"
      )
    )

  const errors = pageValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  if (action === 'create') {
    const { title, text, alias } = req.body
    if (!title || !text || !alias)
      return next(
        new BadRequest('une ou plusieurs données manquante: title,alias,text')
      )
    // case page creation

    const page = req.body
    const newPage = new Page(page)

    try {
      const savedPage = await newPage.save()
      if (savedPage) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(201).send({ message: 'page successfully created' })
        }
        return res
          .status(201)
          .send({ message: 'page successfully created', data: savedPage })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'update' && pageId) {
    // case update

    try {
      const updatedPage = await Page.findOneAndUpdate(
        { _id: pageId },
        req.body,
        {
          returnOriginal: false,
        }
      )
      if (updatedPage) {
        if (process.env.NODE_ENV === 'production') {
          return res.status(200).send({ message: 'page correctement modifiée' })
        }

        return res
          .status(200)
          .send({ message: 'page correctement modifiée', data: updatedPage })
      }
    } catch (err) {
      return next(err)
    }
  } else if (action === 'delete' && pageId) {
    try {
      const deletedPage = await Page.findOneAndDelete({ _id: pageId })
      if (deletedPage) {
        return res.status(200).send({ message: 'page correctement effacée' })
      }
    } catch (err) {
      return next(err)
    }
  } else {
    return next(new BadRequest('params missing: action or id'))
  }
}

module.exports.getPages = async (req, res, next) => {
  const errors = pageValidator(req.body)
  if (errors.length > 0) {
    return next(new BadRequest(errors))
  }

  if (req.query.id) {
    req.query._id = req.query.id
    delete req.query.id
  }
  try {
    const pages = await Page.find(req.query)
    if (pages.length < 1) return next(new NotFound('paper not found'))
    return res.status(200).send(pages)
  } catch (err) {
    next(err)
  }
}
