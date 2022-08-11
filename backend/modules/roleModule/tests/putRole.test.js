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

describe('ROLE - PUT', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should update role', async () => {
    await request(app).post('/api/auth/register').send(adminUserDatas)
    await request(app).post('/api/roles').send(adminRoledatas)
    const managerRole = await request(app)
      .post('/api/roles')
      .send(managerRoledatas)

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
      .put(`/api/roles/${managerRole.body.datas.uuid}`)
      .send({ descr: 'management' })
      .set(tokenHeader)

    expect(getRole.statusCode).toEqual(200)
    expect(getRole.body.datas.descr).toEqual('management')
  })
})
