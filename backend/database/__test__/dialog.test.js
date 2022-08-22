const { faker } = require('@faker-js/faker')
const moment = require('moment')

const truncate = require('../../utils/truncate')
const { dialog } = require('../models')

const fakeDialog = {
  title: faker.company.catchPhrase(),
  content: faker.lorem.sentence(2),
  startdate: moment().add(1, 'days').toDate().toISOString(),
  enddate: moment().add(7, 'days').toDate().toISOString(),
}

describe('MODEL: dialog', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create new dialog', async () => {
    const newDialog = await dialog.create(fakeDialog)

    expect(newDialog).toHaveProperty('uuid')
    expect(newDialog).toHaveProperty('title')
    expect(newDialog).toHaveProperty('content')
    expect(newDialog).toHaveProperty('startdate')
    expect(newDialog).toHaveProperty('enddate')
    expect(newDialog).toHaveProperty('createdAt')
    expect(newDialog).toHaveProperty('updatedAt')
    expect(newDialog).toHaveProperty('deletedAt')
  })

  it('should find dialog', async () => {
    const newDialog = await dialog.create(fakeDialog)
    const foundDialog = await dialog.findOne({
      where: { uuid: newDialog.uuid },
    })

    expect(foundDialog.getDataValue('title')).toEqual(fakeDialog.title)
  })
  it('should update dialog', async () => {
    const newDialog = await dialog.create(fakeDialog)
    const updatedPage = await newDialog.update({ title: 'le bon port' })

    expect(updatedPage.getDataValue('title')).toEqual('le bon port')
    expect(updatedPage.getDataValue('createdAt')).not.toEqual(
      updatedPage.getDataValue('updatedAt')
    )
  })
  it('should destroy dialog', async () => {
    const newDialog = await dialog.create(fakeDialog)
    const foundDialog = await dialog.findOne({
      where: { uuid: newDialog.uuid },
    })

    expect(foundDialog.getDataValue('deletedAt')).not.toBe('null')
  })
})
