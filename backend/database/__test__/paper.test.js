const { faker } = require('@faker-js/faker')
const slugify = require('../../utils/slugify')
const truncate = require('../../utils/truncate')
const { entity, paper, file } = require('../models')

const entityName = 'la vie est belle'
const paperTitle = 'le meilleur paper'
const fakeEntity = {
  name: entityName,
  email: faker.internet.email(),
  content: faker.lorem.paragraphs(2, '<br/>\n'),
}

const fakePaper = {
  title: paperTitle,
  type: 'event',
  content: faker.lorem.sentence(1),
}

describe('MODEL: paper', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create new paper', async () => {
    const newPaper = await paper.create(fakePaper)

    expect(newPaper).toHaveProperty('uuid')
    expect(newPaper).toHaveProperty('title')
    expect(newPaper).toHaveProperty('type')
    expect(newPaper).toHaveProperty('content')
    expect(newPaper).toHaveProperty('date')
    expect(newPaper).toHaveProperty('startdate')
    expect(newPaper).toHaveProperty('enddate')
    expect(newPaper).toHaveProperty('isPrivate')
    expect(newPaper).toHaveProperty('createdAt')
    expect(newPaper).toHaveProperty('updatedAt')
    expect(newPaper).toHaveProperty('deletedAt')
  })
  it('should find paper', async () => {
    const newPaper = await paper.create(fakePaper)
    const newPaperUuid = newPaper.getDataValue('uuid')
    const foundPaper = await paper.findOne({ where: { uuid: newPaperUuid } })

    expect(foundPaper).toHaveProperty('uuid')
  })
  it('should update paper', async () => {
    const newPaper = await paper.create(fakePaper)
    const newPaperContent = 'la porte ouverte'
    const updatedpaper = await newPaper.update({ content: newPaperContent })

    expect(updatedpaper.getDataValue('content')).toEqual(newPaperContent)
    expect(updatedpaper.getDataValue('createdAt')).not.toEqual('updatedAt')
  })
  it('should delete paper', async () => {
    const newPaper = await paper.create(fakePaper)
    const deletedPaper = await newPaper.destroy()

    expect(deletedPaper.deletedAt).not.toEqual(null)
  })
  it('should add paper to entity', async () => {
    const newEntity = await entity.create(fakeEntity)
    const newPaper = await paper.create(fakePaper)
    await newEntity.addPaper(newPaper)

    const foundPaper = await paper.findOne({
      where: { uuid: newPaper.uuid },
      include: [entity],
    })

    expect(foundPaper.entity.slug).toEqual(newEntity.slug)
  })
  it('should add file to paper', async () => {
    const fakeFile = {
      filename: 'bonbon',
      filepath: 'tres-bon',
    }
    const newPaper = await paper.create(fakePaper)
    const newFile = await file.create(fakeFile)
    await newPaper.addFile(newFile)

    const foundPaper = await paper.findOne({
      where: { uuid: newPaper.uuid },
      include: [file],
    })

    expect(foundPaper.files[0].filename).toEqual(newFile.filename)
  })
})
