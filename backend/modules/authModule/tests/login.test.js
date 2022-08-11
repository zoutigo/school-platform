const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const { user } = require('../../../database/models')
const truncate = require('../../../utils/truncate')

const fakeEmail = 'user@test.com'

describe('USER LOGIN', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should log in a new user', async () => {
    await request(app).post('/api/auth/register').send({
      email: fakeEmail,
      password: 'Karamba789',
      passwordConfirm: 'Karamba789',
      lastname: 'robert',
      firstname: 'emilio',
    })

    const login = await request(app).post('/api/auth/login').send({
      username: fakeEmail,
      password: 'Karamba789',
    })

    expect(login.statusCode).toEqual(200)
    expect(login.body).toHaveProperty('token')
    expect(login.body).toHaveProperty('message')
  })
})
