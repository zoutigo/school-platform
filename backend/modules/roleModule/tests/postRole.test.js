const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')

const fakeRoleName = `la belle famille`

describe('ROLE - POST', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create new role', async () => {
    const newRole = await request(app)
      .post('/api/roles')
      .send({
        name: fakeRoleName,
        descr: faker.lorem.sentence(1),
      })

    expect(newRole.statusCode).toEqual(201)
  })
})
