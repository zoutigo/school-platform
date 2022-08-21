const request = require('supertest')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')

const fakePage = {
  title: 'une nouvelle page',
  content: faker.lorem.sentence(2),
}

const adminRoledatas = {
  name: 'admin',
  descr: 'administrer le site',
}
const managerRoledatas = {
  name: 'manager',
  descr: 'manager le site',
}

const adminUserDatas = {
  email: 'admin@test.com',
  password: 'Karamba789',
  passwordConfirm: 'Karamba789',
  lastname: 'robert',
  firstname: 'emilio',
}
const managerUserDatas = {
  email: 'manager@test.com',
  password: 'Karamba789',
  passwordConfirm: 'Karamba789',
  lastname: 'robert',
  firstname: 'emilio',
}

describe('PAGE - PUT', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should update role by manager', async () => {
    // admin stuff
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

    const adminTokenHeader = {
      Authorization: `Bearer ${adminLogin.body.token}`,
    }

    // manager stuff

    const managerRole = await request(app)
      .post('/api/roles')
      .send(managerRoledatas)

    expect(managerRole.statusCode).toEqual(201)

    const managerRegister = await request(app)
      .post('/api/auth/register')
      .send(managerUserDatas)

    expect(managerRegister.statusCode).toEqual(201)

    const managerUser = await user.findOne({
      where: { email: managerUserDatas.email },
    })
    const manageRole = await role.findOne({
      where: { slug: 'manager' },
    })

    await managerUser.addRole(manageRole)

    const managerLogin = await request(app).post('/api/auth/login').send({
      username: managerUserDatas.email,
      password: managerUserDatas.password,
    })

    const managerTokenHeader = {
      Authorization: `Bearer ${managerLogin.body.token}`,
    }

    // create page
    const newPage = await request(app)
      .post('/api/pages')
      .set(adminTokenHeader)
      .send(fakePage)

    expect(newPage.statusCode).toEqual(201)

    // update page

    const newPageTitle = 'une vrai poubelle'

    const updatePage = await request(app)
      .put(`/api/pages/${newPage.body.datas.uuid}`)
      .set(managerTokenHeader)
      .send({ title: newPageTitle })

    expect(updatePage.statusCode).toEqual(200)
    expect(updatePage.body.datas).not.toHaveProperty('id')
    expect(updatePage.body.datas).toHaveProperty('uuid')
    expect(updatePage.body.datas).toHaveProperty('title')
    expect(updatePage.body.datas).toHaveProperty('slug')
    expect(updatePage.body.datas).toHaveProperty('createdAt')
    expect(updatePage.body.datas).toHaveProperty('updatedAt')
    expect(updatePage.body.datas).toHaveProperty('deletedAt')
  })
})
