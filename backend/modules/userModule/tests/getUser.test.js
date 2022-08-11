const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')

const userEmail = faker.internet.email()

const userDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: userEmail,
  password: 'Karamba4567',
  passwordConfirm: 'Karamba4567',
}

describe('USER GET', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should return requested user', async () => {
    const register = await request(app)
      .post('/api/auth/register')
      .send(userDatas)

    const getUser = await request(app).get(
      `/api/users/${register.body.datas.uuid}`
    )

    expect(getUser.statusCode).toEqual(200)
    expect(getUser.body).not.toHaveProperty('password')
    expect(getUser.body).not.toHaveProperty('id')
    expect(getUser.body).toHaveProperty('uuid')
    expect(getUser.body).toHaveProperty('email')
    expect(getUser.body).toHaveProperty('lastname')
    expect(getUser.body).toHaveProperty('firstname')
    expect(getUser.body).toHaveProperty('gender')
    expect(getUser.body).toHaveProperty('emailToken')
    expect(getUser.body).toHaveProperty('losspassToken')
    expect(getUser.body).toHaveProperty('roles')
    expect(getUser.body).toHaveProperty('entities')
    expect(getUser.body).toHaveProperty('createdAt')
    expect(getUser.body).toHaveProperty('updatedAt')
  })
  it('should return status 400 for wrong uuid format', async () => {
    await request(app).post('/api/auth/register').send(userDatas)

    const getUser = await request(app).get(`/api/users/1`)

    expect(getUser.statusCode).toEqual(400)
  })
})
