const { faker } = require('@faker-js/faker')
const slugify = require('../../utils/slugify')
const truncate = require('../../utils/truncate')
const { page } = require('../models')

const fakePage = {
  title: faker.company.catchPhrase(),
  content: faker.lorem.sentence(2),
}

describe('MODEL: page', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create new page', async () => {
    const newPage = await page.create(fakePage)

    expect(newPage).toHaveProperty('uuid')
    expect(newPage).toHaveProperty('title')
    expect(newPage).toHaveProperty('slug')
    expect(newPage).toHaveProperty('createdAt')
    expect(newPage).toHaveProperty('updatedAt')
    expect(newPage).toHaveProperty('deletedAt')
    expect(newPage.getDataValue('slug')).toEqual(slugify(fakePage.title))
  })

  it('should find page', async () => {
    const newPage = await page.create(fakePage)
    const foundPage = await page.findOne({ where: { uuid: newPage.uuid } })

    expect(foundPage.getDataValue('title')).toEqual(fakePage.title)
  })
  it('should update page', async () => {
    const newPage = await page.create(fakePage)
    const updatedPage = await newPage.update({ title: 'le bon port' })

    expect(updatedPage.getDataValue('slug')).toEqual('le-bon-port')
    expect(updatedPage.getDataValue('createdAt')).not.toEqual('updatedAt')
  })
  it('should destroy page', async () => {
    const newPage = await page.create(fakePage)
    const foundPage = await page.findOne({ where: { uuid: newPage.uuid } })

    expect(foundPage.getDataValue('deletedAt')).not.toBe('null')
  })
})
