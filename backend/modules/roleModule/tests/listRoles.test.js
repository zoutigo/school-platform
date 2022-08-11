const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')

const fakeRoleName = `la belle famille`
const fakeEmail = 'user@test.com'

const adminRoledatas = {
  name: 'admin',
  descr: 'administrer le site',
}
const managerRoledatas = {
  name: 'manager le site',
  descr: 'manager le site',
}

const adminUserDatas = {
  email: fakeEmail,
  password: 'Karamba789',
  passwordConfirm: 'Karamba789',
  lastname: 'robert',
  firstname: 'emilio',
}

describe('ROLE - LIST', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should list  roles', async () => {
    await request(app).post('/api/auth/register').send(adminUserDatas)
    await request(app).post('/api/roles').send(adminRoledatas)
    await request(app).post('/api/roles').send(managerRoledatas)

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

    const getRole = await request(app).get(`/api/roles`).set(tokenHeader)

    expect(getRole.statusCode).toEqual(200)
    expect(getRole.body.datas.length).toEqual(2)
    expect(getRole.body.datas[0]).not.toHaveProperty('id')
    expect(getRole.body.datas[0]).toHaveProperty('slug')
    expect(getRole.body.datas[0]).toHaveProperty('name')
    expect(getRole.body.datas[0]).toHaveProperty('descr')
  })
})
