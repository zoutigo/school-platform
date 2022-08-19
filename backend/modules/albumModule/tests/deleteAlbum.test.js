const request = require('supertest')
const path = require('path')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')
const { testImagesFolder } = require('../../../constants/testFolders')
const cleanDirectory = require('../../../utils/cleanDirectory')

const fakeAlbum1 = {
  name: faker.company.catchPhrase(),
  descr: faker.lorem.sentence(2),
  isPrivate: true,
}
const fakeAlbum2 = {
  name: faker.company.catchPhrase(),
  descr: faker.lorem.sentence(2),
  isPrivate: false,
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

const imagepath1 = path.resolve(
  __dirname,
  `../../../tests/test_images/test_img1.jpg`
)

describe('ALBUM - DELETE', () => {
  beforeEach(async () => {
    await truncate()
  })
  afterEach(async () => {
    await cleanDirectory(testImagesFolder)
  })

  it('should return one album', async () => {
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

    const newAlbum1 = await request(app)
      .post('/api/albums')
      .set(userTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('name', fakeAlbum1.name)
      .field('descr', fakeAlbum1.descr)
      .field('isPrivate', fakeAlbum1.isPrivate)
      .attach('files', imagepath1)

    expect(newAlbum1.statusCode).toEqual(201)

    const deleteAlbum = await request(app)
      .delete(`/api/albums/${newAlbum1.body.datas.uuid}`)
      .set(userTokenHeader)
      .send({ entityUuid: newEntity.body.datas.uuid })

    expect(deleteAlbum.statusCode).toEqual(200)

    const getAlbum = await request(app).get(
      `/api/albums/${newAlbum1.body.datas.uuid}`
    )

    expect(getAlbum.statusCode).toEqual(404)
  })
})
