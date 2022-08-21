const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')

const fakePage = {
  title: 'une nouvelle page',
  content: faker.lorem.sentence(2),
}

const adminDatas = {
  email: 'admin@test.com',
  password: 'Karamba789',
  passwordConfirm: 'Karamba789',
  lastname: 'robert',
  firstname: 'emilio',
}
const adminRoledatas = {
  name: 'admin',
  descr: 'administrer le site',
}

describe('PAGE - GET', () => {
  beforeEach(async () => {
    await truncate()
  })
  it('should return statuscode 401 if no logged', async () => {
    const newPage = await request(app)
      .post('/api/cards')
      .send({
        ...fakePage,
      })

    expect(newPage.statusCode).toEqual(401)
  })

  it('should get new page', async () => {
    await request(app).post('/api/roles').send(adminRoledatas)
    await request(app).post('/api/auth/register').send(adminDatas)

    // set admin role
    const adminUser = await user.findOne({
      where: { email: adminDatas.email },
    })
    const adminRole = await role.findOne({
      where: { slug: 'admin' },
    })

    await adminUser.setRoles([adminRole])

    // Login admin

    const adminLogin = await request(app).post('/api/auth/login').send({
      username: adminDatas.email,
      password: adminDatas.password,
    })

    const adminTokenHeader = {
      Authorization: `Bearer ${adminLogin.body.token}`,
    }

    // post page by admin

    const newPage = await request(app)
      .post('/api/pages')
      .set(adminTokenHeader)
      .send(fakePage)

    expect(newPage.statusCode).toEqual(201)

    // get page
    const foundPage = await request(app).get(
      `/api/pages/${newPage.body.datas.uuid}`
    )

    expect(foundPage.statusCode).toEqual(200)
    expect(foundPage.body.datas).not.toHaveProperty('id')
    expect(foundPage.body.datas).toHaveProperty('uuid')
    expect(foundPage.body.datas).toHaveProperty('title')
    expect(foundPage.body.datas).toHaveProperty('slug')
    expect(foundPage.body.datas).toHaveProperty('createdAt')
    expect(foundPage.body.datas).toHaveProperty('updatedAt')
    expect(foundPage.body.datas).toHaveProperty('deletedAt')
  })
})
