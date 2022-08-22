const request = require('supertest')
const moment = require('moment')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')

const fakeDialog = {
  title: 'un nouveau dialogue',
  content: faker.lorem.sentence(2),
  startdate: moment().add(1, 'days').toDate().toISOString(),
  enddate: moment().add(7, 'days').toDate().toISOString(),
}

const adminUserDatas = {
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

const managerUserDatas = {
  email: 'manager@test.com',
  password: 'Karamba789',
  passwordConfirm: 'Karamba789',
  lastname: 'robert',
  firstname: 'emilio',
}

const managerRoledatas = {
  name: 'manager',
  descr: 'manager le site',
}

describe('DIALOG - DELETE', () => {
  beforeEach(async () => {
    await truncate()
  })
  it('should return statuscode 401 if no logged', async () => {
    const newDialog = await request(app)
      .post('/api/dialogs')
      .send({
        ...fakeDialog,
      })

    expect(newDialog.statusCode).toEqual(401)
  })

  it('should create new dialog', async () => {
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

    // post dialog by manager

    const newDialog = await request(app)
      .post('/api/dialogs')
      .set(managerTokenHeader)
      .send(fakeDialog)

    expect(newDialog.statusCode).toEqual(201)

    const deleteDialog = await request(app)
      .delete(`/api/dialogs/${newDialog.body.datas.uuid}`)
      .set(managerTokenHeader)

    expect(deleteDialog.statusCode).toEqual(200)

    const getDialog = await request(app).get(
      `/api/dialogs/${newDialog.body.datas.uuid}`
    )
    expect(getDialog.statusCode).toEqual(404)
  })
})
