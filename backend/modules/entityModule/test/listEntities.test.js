const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')

const fakeEntity1 = {
  name: faker.lorem.sentence(1),
  email: faker.internet.email(),
  content: faker.lorem.paragraphs(10, '<br/>\n'),
}
const fakeEntity2 = {
  name: faker.lorem.sentence(1),
  email: faker.internet.email(),
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

describe('ENTITY - LIST', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should list entities', async () => {
    await request(app).post('/api/entities').send(fakeEntity1)
    await request(app).post('/api/entities').send(fakeEntity2)

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

    const requesteEntities = await request(app)
      .get(`/api/entities/`)
      .set(tokenHeader)

    expect(requesteEntities.statusCode).toEqual(200)

    expect(requesteEntities.body.datas.length).toEqual(2)
    expect(requesteEntities.body.datas[0]).toHaveProperty('uuid')
    expect(requesteEntities.body.datas[0]).not.toHaveProperty('id')
  })
})
