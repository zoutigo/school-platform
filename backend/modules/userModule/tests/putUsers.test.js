const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')

const userDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'Karamba4567',
  passwordConfirm: 'Karamba4567',
}
const adminDatas = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'Karamba4567',
  passwordConfirm: 'Karamba4567',
}

const adminRoleDatas = {
  name: 'admin',
  descr: 'administrer le site',
  slug: 'admin',
}
const psRoleDatas = {
  name: 'enseignant ps',
  descr: 'enseigner en classe de petite section',
  slug: 'enseignant-ps',
}

const gsRoleDatas = {
  name: 'enseignant gs',
  descr: 'enseigner en classe de grande section',
  slug: 'enseignant-gs',
}

describe('USER PUT', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should update user simple fields with owner profile', async () => {
    const userRegister = await request(app)
      .post('/api/auth/register')
      .send(userDatas)

    const userLogin = await request(app)
      .post(`/api/auth/login`)
      .send({ username: userDatas.email, password: userDatas.password })

    const tokenHeader = {
      Authorization: `Bearer ${userLogin.body.token}`,
    }

    const updateUser = await request(app)
      .put(`/api/users/${userRegister.body.datas.uuid}`)
      .send({ lastname: 'valeria', firstname: 'robert', gender: 'madame' })
      .set(tokenHeader)

    expect(updateUser.statusCode).toEqual(200)
    expect(updateUser.body.datas.lastname).toEqual('valeria')
    expect(updateUser.body.datas.firstname).toEqual('robert')
    expect(updateUser.body.datas.gender).toEqual('madame')
  })
})
