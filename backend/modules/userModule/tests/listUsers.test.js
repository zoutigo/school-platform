const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')

const userDatas1 = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'Karamba4567',
  passwordConfirm: 'Karamba4567',
}
const userDatas2 = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'Karamba4567',
  passwordConfirm: 'Karamba4567',
}

describe('USER GET', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should return requested users', async () => {
    await request(app).post('/api/auth/register').send(userDatas1)
    await request(app).post('/api/auth/register').send(userDatas2)

    const getUsers = await request(app).get(`/api/users/`)

    expect(getUsers.statusCode).toEqual(200)
    expect(getUsers.body.datas.length).toEqual(2)
    expect(getUsers.body.datas[0]).not.toHaveProperty('password')
    expect(getUsers.body.datas[0]).not.toHaveProperty('id')
    expect(getUsers.body.datas[0]).toHaveProperty('uuid')
    expect(getUsers.body.datas[0]).toHaveProperty('email')
    expect(getUsers.body.datas[0]).toHaveProperty('lastname')
    expect(getUsers.body.datas[0]).toHaveProperty('firstname')
    expect(getUsers.body.datas[0]).toHaveProperty('gender')
    expect(getUsers.body.datas[0]).toHaveProperty('emailToken')
    expect(getUsers.body.datas[0]).toHaveProperty('losspassToken')
    expect(getUsers.body.datas[0]).toHaveProperty('roles')
    expect(getUsers.body.datas[0]).toHaveProperty('entities')
    expect(getUsers.body.datas[0]).toHaveProperty('createdAt')
    expect(getUsers.body.datas[0]).toHaveProperty('updatedAt')
  })
})
