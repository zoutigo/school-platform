const request = require('supertest')
const moment = require('moment')
const path = require('path')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')
const slugify = require('../../../utils/slugify')
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

const docpath1 = path.resolve(
  __dirname,
  `../../../tests/test_documents/doc1.pdf`
)
const docpath2 = path.resolve(
  __dirname,
  `../../../tests/test_documents/doc2.pdf`
)

describe('PAPER - PUT', () => {
  beforeEach(async () => {
    await truncate()
  })
  afterEach(async () => {
    await cleanDirectory(testFilesFolder)
  })

  it('should update paper by user', async () => {
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
      .attach('files', docpath1)

    const newPaperTitle = 'une excellente moto'
    const newPaperType = 'fourniture'
    const newPaperIsPrivate = false
    const newPaperDate = moment().add(4, 'days').toDate().toISOString()

    const putPaper = await request(app)
      .put(`/api/papers/${newPaper.body.datas.uuid}`)
      .set(userTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('title', newPaperTitle)
      .field('type', newPaperType)
      .field('date', newPaperDate)
      .field('isPrivate', newPaperIsPrivate)

    expect(putPaper.statusCode).toEqual(200)
    expect(putPaper.body.datas).toHaveProperty('uuid')

    expect(JSON.stringify(putPaper.body.datas.title)).toEqual(
      JSON.stringify(newPaperTitle)
    )
    expect(putPaper.body.datas).toHaveProperty('isPrivate')
    expect(putPaper.body.datas.isPrivate).toEqual(newPaperIsPrivate)
    expect(putPaper.body.datas).toHaveProperty('files')
    expect(putPaper.body.datas.files.length).toEqual(1)
  })

  it('should put paper by admin', async () => {
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
      .attach('files', docpath1)

    const newPaperTitle = 'une excellente moto'
    const newPaperType = 'fourniture'
    const newPaperIsPrivate = false
    const newPaperDate = moment().add(4, 'days').toDate().toISOString()

    const putPaper = await request(app)
      .put(`/api/papers/${newPaper.body.datas.uuid}`)
      .set(adminTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('title', newPaperTitle)
      .field('type', newPaperType)
      .field('date', newPaperDate)
      .field('isPrivate', newPaperIsPrivate)

    expect(putPaper.statusCode).toEqual(200)
    expect(putPaper.body.datas).toHaveProperty('uuid')

    expect(putPaper.body.datas.title).toEqual(newPaperTitle)
    expect(putPaper.body.datas).toHaveProperty('type')
    expect(JSON.stringify(putPaper.body.datas.type)).toEqual(
      JSON.stringify(newPaperType)
    )
    expect(putPaper.body.datas).toHaveProperty('isPrivate')
    expect(putPaper.body.datas.isPrivate).toEqual(newPaperIsPrivate)
    expect(putPaper.body.datas).toHaveProperty('content')
    expect(putPaper.body.datas).toHaveProperty('files')
    expect(putPaper.body.datas.files.length).toEqual(1)
  })
  it('should put paper file by admin and remove file', async () => {
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
      .attach('files', docpath1)
      .attach('files', docpath2)

    const newPaperTitle = 'une excellente moto'
    const newPaperType = 'fourniture'
    const newPaperIsPrivate = false
    // const toBeRemovedFiles = Array(newPaper.body.datas.files[0].uuid)

    const putPaper = await request(app)
      .put(`/api/papers/${newPaper.body.datas.uuid}`)
      .set(adminTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('title', newPaperTitle)
      .field('type', newPaperType)
      .field('isPrivate', newPaperIsPrivate)
      .field('todeletefilesUuids', newPaper.body.datas.files[0].uuid)
      .field('todeletefilesUuids', newPaper.body.datas.files[1].uuid)
      .attach('files', docpath1)

    expect(putPaper.statusCode).toEqual(200)
    expect(putPaper.body.datas).toHaveProperty('uuid')
    expect(putPaper.body.datas).toHaveProperty('title')
    expect(putPaper.body.datas).toHaveProperty('type')
    expect(putPaper.body.datas.title).toEqual(newPaperTitle)
    expect(putPaper.body.datas).toHaveProperty('content')

    expect(putPaper.body.datas).toHaveProperty('isPrivate')
    expect(putPaper.body.datas.isPrivate).toEqual(newPaperIsPrivate)
    expect(putPaper.body.datas).toHaveProperty('files')
    expect(putPaper.body.datas.files.length).toEqual(1)
  })
})
