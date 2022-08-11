const { faker } = require('@faker-js/faker')
const truncate = require('../../utils/truncate')
const { entity, user } = require('../models')

const fakeEntity0 = {
  name: faker.name.firstName(),
  alias: 'ps',
  email: faker.internet.email(),
  content: faker.lorem.paragraphs(2, '<br/>\n'),
}
const fakeEntity1 = {
  name: faker.name.firstName(),
  alias: 'ms',
  email: faker.internet.email(),
  content: faker.lorem.paragraphs(2, '<br/>\n'),
}

const fakeUser = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  password: 'Geremy65',
  phone: '0650597839',
}

describe('MODEL: user_entities', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should add user entities', async () => {
    const newUser = await user.build(fakeUser).save()
    const newEntity0 = await entity.build(fakeEntity0).save()
    const newentity1 = await entity.build(fakeEntity1).save()

    await newUser.addEntity(newEntity0)
    await newUser.addEntity(newentity1)

    const userEntities = await newUser.getEntities()

    expect(userEntities.length).toEqual(2)
  })
  it('should remove user entities', async () => {
    const newUser = await user.build(fakeUser).save()
    const newEntity0 = await entity.build(fakeEntity0).save()
    const newentity1 = await entity.build(fakeEntity1).save()

    await newUser.addEntity(newEntity0)
    await newUser.addEntity(newentity1)

    const toberemovedRole = await entity.findOne({
      where: { alias: 'ms' },
    })
    await newUser.removeEntity(toberemovedRole)

    const userEntities = await newUser.getEntities()
    expect(userEntities.length).toEqual(1)
  })
})
