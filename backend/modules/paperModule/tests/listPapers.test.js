const request = require('supertest')
const moment = require('moment')
const path = require('path')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')
const cleanDirectory = require('../../../utils/cleanDirectory')
const { testFilesFolder } = require('../../../constants/testFolders')

const fakePaper1 = {
  title: faker.company.catchPhrase(),
  content: faker.lorem.sentence(5),
  type: 'event',
  isPrivate: true,
  startdate: moment().add(1, 'days').toDate().toISOString(),
  enddate: moment().add(300, 'days').toDate().toISOString(),
  date: moment().add(4, 'days').toDate().toISOString(),
}
const fakePaper2 = {
  title: faker.company.catchPhrase(),
  content: faker.lorem.sentence(5),
  type: 'event',
  isPrivate: true,
  startdate: moment().add(7, 'days').toDate().toISOString(),
  enddate: moment().add(365, 'days').toDate().toISOString(),
  date: moment().add(20, 'days').toDate().toISOString(),
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

const docpath1 = path.resolve(
  __dirname,
  `../../../tests/test_documents/doc1.pdf`
)
const docpath2 = path.resolve(
  __dirname,
  `../../../tests/test_documents/doc2.pdf`
)

describe('PAPER - LIST', () => {
  beforeEach(async () => {
    await truncate()
  })
  afterEach(async () => {
    await cleanDirectory(testFilesFolder)
  })

  it('should return list of albums', async () => {
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

    const newPaper1 = await request(app)
      .post('/api/papers')
      .set(userTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('title', fakePaper1.title)
      .field('type', fakePaper1.type)
      .field('content', fakePaper1.content)
      .field('isPrivate', fakePaper1.isPrivate)
      .field('date', fakePaper1.date)
      .field('startdate', fakePaper1.startdate)
      .field('enddate', fakePaper1.enddate)
      .attach('files', docpath1)

    expect(newPaper1.statusCode).toEqual(201)

    const newPaper2 = await request(app)
      .post('/api/papers')
      .set(userTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('title', fakePaper2.title)
      .field('type', fakePaper2.type)
      .field('content', fakePaper2.content)
      .field('isPrivate', fakePaper2.isPrivate)
      .field('date', fakePaper2.date)
      .field('startdate', fakePaper2.startdate)
      .field('enddate', fakePaper2.enddate)
      .attach('files', docpath2)

    expect(newPaper2.statusCode).toEqual(201)

    const listPaper = await request(app).get(`/api/papers`)

    expect(listPaper.statusCode).toEqual(200)
    expect(listPaper.body.datas.length).toEqual(2)

    expect(listPaper.body.datas[0]).toHaveProperty('uuid')
    expect(listPaper.body.datas[0]).not.toHaveProperty('id')
    expect(listPaper.body.datas[0]).toHaveProperty('title')
    expect(listPaper.body.datas[0]).toHaveProperty('type')
    expect(listPaper.body.datas[0]).toHaveProperty('content')
    expect(listPaper.body.datas[0]).toHaveProperty('classroom')
    expect(listPaper.body.datas[0]).toHaveProperty('isPrivate')
    expect(listPaper.body.datas[0]).toHaveProperty('date')
    expect(listPaper.body.datas[0]).toHaveProperty('startdate')
    expect(listPaper.body.datas[0]).toHaveProperty('enddate')
    expect(listPaper.body.datas[0]).toHaveProperty('files')
    expect(listPaper.body.datas[0].files.length).toEqual(1)
    expect(listPaper.body.datas[0].files[0]).toHaveProperty('filename')
    expect(listPaper.body.datas[0].files[0]).toHaveProperty('filepath')
    expect(listPaper.body.datas[0].files[0]).toHaveProperty('uuid')
    expect(listPaper.body.datas[0].files[0]).toHaveProperty('createdAt')
    expect(listPaper.body.datas[0].files[0]).toHaveProperty('updatedAt')
    expect(listPaper.body.datas[0].files[0]).toHaveProperty('deletedAt')
    expect(listPaper.body.datas[0]).toHaveProperty('entity')
  })
})
