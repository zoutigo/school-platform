const { faker } = require('@faker-js/faker')
const truncate = require('../../utils/truncate')
const { entity } = require('../models')

const entityName = 'la vie est belle'
const fakeEntity = {
  name: entityName,
  // alias: testAlias,
  email: faker.internet.email(),
  content: faker.lorem.paragraphs(2, '<br/>\n'),
}

describe('MODEL: entity', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create new entity', async () => {
    const newEntity = await entity.create(fakeEntity)
    expect(newEntity).toHaveProperty('uuid')
    expect(newEntity).toHaveProperty('name')
    expect(newEntity).toHaveProperty('alias')
    expect(newEntity).toHaveProperty('email')
    expect(newEntity).toHaveProperty('createdAt')
    expect(newEntity).toHaveProperty('updatedAt')
    expect(newEntity.getDataValue('alias')).toEqual('la-vie-est-belle')
  })
  it('should find entity', async () => {
    const newEntity = await entity.create(fakeEntity)
    const newEntityUuid = newEntity.getDataValue('uuid')
    const foundEntity = await entity.findOne({ where: { uuid: newEntityUuid } })

    expect(foundEntity).toHaveProperty('uuid')
  })
  it('update entity', async () => {
    const newEntity = await entity.create(fakeEntity)
    const updatedEntity = await newEntity.update({ name: 'le bon port' })

    expect(updatedEntity.getDataValue('alias')).toEqual('le-bon-port')
    expect(updatedEntity.getDataValue('createdAt')).not.toEqual('updatedAt')
  })
  it('delete entity', async () => {
    const newEntity = await entity.create(fakeEntity)
    const destroyedEntity = await newEntity.destroy()

    expect(destroyedEntity.getDataValue('deletedAt')).not.toBeNull()
  })
})