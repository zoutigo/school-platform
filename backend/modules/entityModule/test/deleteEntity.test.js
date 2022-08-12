const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')

const fakeEntityName = `la belle famille`
const fakeEntityEmail = 'entity@test.com'

const fakeEntity = {
  name: fakeEntityName,
  email: fakeEntityEmail,
  content: faker.lorem.paragraphs(10, '<br/>\n'),
}

const adminRoledatas = {
  name: 'admin',
  descr: 'administrer le site',
}
const fakeEmail = 'user@test.com'

const adminUserDatas = {
  email: fakeEmail,
  password: 'Karamba789',
  passwordConfirm: 'Karamba789',
  lastname: 'robert',
  firstname: 'emilio',
}

describe('ENTITY - DELETE', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should delete entity', async () => {
    const newEntity = await request(app).post('/api/entities').send(fakeEntity)

    await request(app).post('/api/auth/register').send(adminUserDatas)
    await request(app).post('/api/roles').send(adminRoledatas)

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

    const requesteEntity = await request(app)
      .delete(`/api/entities/${newEntity.body.datas.uuid}`)
      .set(tokenHeader)

    expect(requesteEntity.statusCode).toEqual(200)
  })
})