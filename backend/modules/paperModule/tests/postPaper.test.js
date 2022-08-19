const request = require('supertest')
const path = require('path')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')
const cleanDirectory = require('../../../utils/cleanDirectory')
const { testFilesFolder } = require('../../../constants/testFolders')

const fakePaper = {
  title: 'un nouvel paper',
  content: faker.lorem.sentence(5),
  type: 'activite',
  isPrivate: true,
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

describe('PAPER - POST', () => {
  beforeEach(async () => {
    await truncate()
  })
  afterEach(async () => {
    await cleanDirectory(testFilesFolder)
  })

  it('should return statuscode 401 if no logged', async () => {
    const newPaper = await request(app)
      .post('/api/papers')
      .send({
        ...fakePaper,
      })

    expect(newPaper.statusCode).toEqual(401)
  })

  it('should create new paper with user having entity role', async () => {
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

    // post paper by user

    const newPaper = await request(app)
      .post('/api/papers')
      .set(userTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('title', fakePaper.title)
      .field('type', fakePaper.type)
      .field('content', fakePaper.content)
      .field('isPrivate', fakePaper.isPrivate)
      .attach('files', docpath)

    expect(newPaper.statusCode).toEqual(201)
    expect(newPaper.body.datas).not.toHaveProperty('id')
    expect(newPaper.body.datas).toHaveProperty('title')
    expect(newPaper.body.datas).toHaveProperty('type')
    expect(newPaper.body.datas).toHaveProperty('content')
    expect(newPaper.body.datas).toHaveProperty('classroom')
    expect(newPaper.body.datas).toHaveProperty('isPrivate')
    expect(newPaper.body.datas).toHaveProperty('place')
    expect(newPaper.body.datas).toHaveProperty('date')
    expect(newPaper.body.datas).toHaveProperty('startdate')
    expect(newPaper.body.datas).toHaveProperty('enddate')
    expect(newPaper.body.datas).toHaveProperty('entity')
    expect(newPaper.body.datas).toHaveProperty('files')
    expect(newPaper.body.datas.files.length).toEqual(1)
    expect(newPaper.body.datas.files[0]).toHaveProperty('filename')
    expect(newPaper.body.datas.files[0]).toHaveProperty('filepath')
    expect(newPaper.body.datas.files[0]).toHaveProperty('uuid')
    expect(newPaper.body.datas.files[0]).toHaveProperty('createdAt')
    expect(newPaper.body.datas.files[0]).toHaveProperty('updatedAt')
    expect(newPaper.body.datas.files[0]).toHaveProperty('deletedAt')
  })

  it('should create new paper with admin role', async () => {
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

    // create new entity

    const newEntity = await request(app).post('/api/entities').send(fakeEntity)
    // expect(newEntity.statusCode).toEqual(201)

    // post paper by admin

    const newPaper = await request(app)
      .post('/api/papers')
      .set(adminTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('title', fakePaper.title)
      .field('type', fakePaper.type)
      .field('content', fakePaper.content)
      .field('isPrivate', fakePaper.isPrivate)
      .attach('files', docpath)

    expect(newPaper.statusCode).toEqual(201)
    expect(newPaper.body.datas).not.toHaveProperty('id')
    expect(newPaper.body.datas).toHaveProperty('title')
    expect(newPaper.body.datas).toHaveProperty('type')
    expect(newPaper.body.datas).toHaveProperty('content')
    expect(newPaper.body.datas).toHaveProperty('classroom')
    expect(newPaper.body.datas).toHaveProperty('isPrivate')
    expect(newPaper.body.datas).toHaveProperty('place')
    expect(newPaper.body.datas).toHaveProperty('date')
    expect(newPaper.body.datas).toHaveProperty('startdate')
    expect(newPaper.body.datas).toHaveProperty('enddate')
    expect(newPaper.body.datas).toHaveProperty('entity')
    expect(newPaper.body.datas).toHaveProperty('files')
    expect(newPaper.body.datas.files.length).toEqual(1)
    expect(newPaper.body.datas.files[0]).toHaveProperty('filename')
    expect(newPaper.body.datas.files[0]).toHaveProperty('filepath')
    expect(newPaper.body.datas.files[0]).toHaveProperty('uuid')
    expect(newPaper.body.datas.files[0]).toHaveProperty('createdAt')
    expect(newPaper.body.datas.files[0]).toHaveProperty('updatedAt')
    expect(newPaper.body.datas.files[0]).toHaveProperty('deletedAt')
  })
})
