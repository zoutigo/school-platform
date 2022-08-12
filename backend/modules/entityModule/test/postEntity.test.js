const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')

const fakeEntityName = `la belle famille`
const fakeEntityEmail = 'entity@test.com'

const fakeEntity = {
  name: fakeEntityName,
  email: fakeEntityEmail,
  content: faker.lorem.paragraphs(10, '<br/>\n'),
}

describe('ENTITY - POST', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create new entity', async () => {
    const newEntity = await request(app).post('/api/entities').send(fakeEntity)

    expect(newEntity.statusCode).toEqual(201)
    expect(newEntity.body.datas).not.toHaveProperty('id')
    expect(newEntity.body.datas).toHaveProperty('uuid')
    expect(newEntity.body.datas).toHaveProperty('name')
    expect(newEntity.body.datas).toHaveProperty('alias')
    expect(newEntity.body.datas).toHaveProperty('email')
    expect(newEntity.body.datas).toHaveProperty('content')
    expect(newEntity.body.datas).toHaveProperty('createdAt')
    expect(newEntity.body.datas).toHaveProperty('updatedAt')
    expect(newEntity.body.datas.email).toEqual(fakeEntityEmail)
    expect(newEntity.body.datas.alias).toEqual('la-belle-famille')
  })
})
