const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')

const fakeEmail = faker.internet.email()

describe('USER LOGIN', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should log in a new user', async () => {
    const register = await request(app).post('/api/auth/register').send({
      email: fakeEmail,
      password: 'Karamba789',
      passwordConfirm: 'Karamba789',
      lastname: 'robert',
      firstname: 'emilio',
    })

    expect(register.statusCode).toEqual(201)
  })
})
