const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')
const slugify = require('../../../utils/slugify')

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
  it('should add user role', async () => {
    await request(app).post('/api/roles').send(adminRoleDatas)
    await request(app).post('/api/auth/register').send(adminDatas)

    // set admin role
    const adminUser = await user.findOne({
      where: { email: adminDatas.email },
    })
    const adminRole = await role.findOne({
      where: { slug: 'admin' },
    })

    await adminUser.addRole(adminRole)

    // Login admin
    const adminLogin = await request(app)
      .post(`/api/auth/login`)
      .send({ username: adminDatas.email, password: adminDatas.password })

    const adminTokenHeader = {
      Authorization: `Bearer ${adminLogin.body.token}`,
    }

    // create new role

    const psRole = await request(app).post('/api/roles').send(psRoleDatas)

    // register new user

    const userRegister = await request(app)
      .post('/api/auth/register')
      .send(userDatas)

    const updateUser = await request(app)
      .put(`/api/users/${userRegister.body.datas.uuid}`)
      .send({ roles: [psRole.body.datas.uuid] })
      .set(adminTokenHeader)

    expect(updateUser.statusCode).toEqual(200)
    expect(updateUser.body.datas.roles.length).toEqual(1)
    expect(updateUser.body.datas.roles[0].slug).toEqual(
      slugify(psRoleDatas.name)
    )
  })
})
