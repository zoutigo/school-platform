const request = require('supertest')
const path = require('path')
const { faker } = require('@faker-js/faker')
const moment = require('moment')

const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')
const cleanDirectory = require('../../../utils/cleanDirectory')
const { testFilesFolder } = require('../../../constants/testFolders')

const fakePaper = {
  title: 'un nouvel paper',
  content: faker.lorem.sentence(5),
  type: 'event',
  isPrivate: true,
  startdate: moment().add(1, 'days').toDate().toISOString(),
  enddate: moment().add(300, 'days').toDate().toISOString(),
  date: moment().add(4, 'days').toDate().toISOString(),
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
const userDatas = {
  email: 'user@test.com',
  password: 'Karamba789',
  passwordConfirm: 'Karamba789',
  lastname: 'robert',
  firstname: 'emilio',
}
const fakeEntity = {
  name: 'ps',
  email: 'ps@test.com',
  content: faker.lorem.paragraphs(10, '<br/>\n'),
}

const fakeRoleName = `la belle famille`

const docpath = path.resolve(
  __dirname,
  `../../../tests/test_documents/doc1.pdf`
)

describe('PAPER - GET', () => {
  beforeEach(async () => {
    await truncate()
  })
  afterEach(async () => {
    await cleanDirectory(testFilesFolder)
  })

  it('should return requested paper', async () => {
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

    // Login admnin

    const adminLogin = await request(app).post('/api/auth/login').send({
      username: adminDatas.email,
      password: adminDatas.password,
    })

    const adminTokenHeader = {
      Authorization: `Bearer ${adminLogin.body.token}`,
    }

    // create new entity

    const newEntity = await request(app).post('/api/entities').send(fakeEntity)
    // expect(newEntity.statusCode).toEqual(201)

    // create new role

    const newRole = await request(app)
      .post('/api/roles')
      .send({
        name: fakeRoleName,
        descr: faker.lorem.sentence(1),
      })
    // expect(newRole.statusCode).toEqual(201)

    // set role to entity

    const setEntityRole = await request(app)
      .put(`/api/entities/${newEntity.body.datas.uuid}`)
      .send({ roleUuid: newRole.body.datas.uuid })
      .set(adminTokenHeader)

    expect(setEntityRole.statusCode).toEqual(200)

    // register user
    const userRegister = await request(app)
      .post('/api/auth/register')
      .send(userDatas)
    expect(userRegister.statusCode).toEqual(201)

    // assign role to user

    await request(app)
      .put(`/api/users/${userRegister.body.datas.uuid}`)
      .send({ roles: [newRole.body.datas.uuid] })
      .set(adminTokenHeader)

    // expect(setUserRole.statusCode).toEqual(200)
    // expect(setUserRole.body.datas.roles.length).toEqual(1)

    // log user
    const userLogin = await request(app).post('/api/auth/login').send({
      username: userDatas.email,
      password: userDatas.password,
    })

    // expect(userLogin.statusCode).toEqual(200)

    const userTokenHeader = {
      Authorization: `Bearer ${userLogin.body.token}`,
    }

    // post albums by user

    const newPaper = await request(app)
      .post('/api/papers')
      .set(userTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('title', fakePaper.title)
      .field('type', fakePaper.type)
      .field('content', fakePaper.content)
      .field('isPrivate', fakePaper.isPrivate)
      .field('date', fakePaper.date)
      .field('startdate', fakePaper.startdate)
      .field('enddate', fakePaper.enddate)
      .attach('files', docpath)

    expect(newPaper.statusCode).toEqual(201)

    const requestedPaper = await request(app).get(
      `/api/papers/${newPaper.body.datas.uuid}`
    )

    expect(requestedPaper.statusCode).toEqual(200)
    expect(requestedPaper.body.datas).not.toHaveProperty('id')
    expect(requestedPaper.body.datas).toHaveProperty('title')
    expect(requestedPaper.body.datas).toHaveProperty('type')
    expect(requestedPaper.body.datas).toHaveProperty('content')
    expect(requestedPaper.body.datas).toHaveProperty('classroom')
    expect(requestedPaper.body.datas).toHaveProperty('isPrivate')
    expect(requestedPaper.body.datas).toHaveProperty('place')
    expect(requestedPaper.body.datas).toHaveProperty('date')
    expect(requestedPaper.body.datas).toHaveProperty('startdate')
    expect(requestedPaper.body.datas).toHaveProperty('enddate')
    expect(requestedPaper.body.datas).toHaveProperty('entity')
    expect(requestedPaper.body.datas).toHaveProperty('files')
    expect(requestedPaper.body.datas.files.length).toEqual(1)
    expect(requestedPaper.body.datas.files[0]).toHaveProperty('filename')
    expect(requestedPaper.body.datas.files[0]).toHaveProperty('filepath')
    expect(requestedPaper.body.datas.files[0]).toHaveProperty('uuid')
    expect(requestedPaper.body.datas.files[0]).toHaveProperty('createdAt')
    expect(requestedPaper.body.datas.files[0]).toHaveProperty('updatedAt')
    expect(requestedPaper.body.datas.files[0]).toHaveProperty('deletedAt')
  })
})
