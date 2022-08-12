const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')

const fakeEmail = 'user@test.com'

const adminRoledatas = {
  name: 'admin',
  descr: 'administrer le site',
}

const adminUserDatas = {
  email: fakeEmail,
  password: 'Karamba789',
  passwordConfirm: 'Karamba789',
  lastname: 'robert',
  firstname: 'emilio',
}

describe('ROLE - GET', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create get requested  role', async () => {
    await request(app).post('/api/auth/register').send(adminUserDatas)
    const createdRole = await request(app)
      .post('/api/roles')
      .send(adminRoledatas)

    const adminUser = await user.findOne({
      where: { email: adminUserDatas.email },
    })
    const adminRole = await role.findOne({
      where: { slug: 'admin' },
    })

    await adminUser.addRole(adminRole)

    const adminLogin = await request(app).post('/api/auth/login').send({
      username: adminUserDatas.email,
      password: adminUserDatas.password,
    })

    const tokenHeader = {
      Authorization: `Bearer ${adminLogin.body.token}`,
    }

    const getRole = await request(app)
      .get(`/api/roles/${createdRole.body.datas.uuid}`)
      .set(tokenHeader)

    expect(getRole.statusCode).toEqual(200)
    expect(getRole.body.datas).not.toHaveProperty('id')
    expect(getRole.body.datas).toHaveProperty('name')
    expect(getRole.body.datas).toHaveProperty('slug')
    expect(getRole.body.datas).toHaveProperty('descr')
  })
})
