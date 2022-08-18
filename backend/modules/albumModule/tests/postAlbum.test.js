const request = require('supertest')
const path = require('path')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')

const fakeAlbum = {
  name: 'un nouvel album',
  descr: faker.lorem.sentence(2),
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

const imagepath = path.resolve(
  __dirname,
  `../../../tests/test_images/test_img1.jpg`
)
// const imagepath1 = path.resolve(__dirname, `../test_images/test_img1.jpg`)
// const imagepath2 = path.resolve(__dirname, `../test_images/test_img2.jpg`)
// const imagepath3 = path.resolve(__dirname, `../test_images/test_img3.jpg`)

describe('ALBUM - POST', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should return statuscode 401 if no logged', async () => {
    const newAlbum = await request(app)
      .post('/api/albums')
      .send({
        ...fakeAlbum,
      })

    expect(newAlbum.statusCode).toEqual(401)
  })

  it('should create new album with user having entity role', async () => {
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

    // post album by user

    const newAlbum = await request(app)
      .post('/api/albums')
      .set(userTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('name', fakeAlbum.name)
      .field('descr', fakeAlbum.descr)
      .field('isPrivate', fakeAlbum.isPrivate)
      .attach('files', imagepath)

    expect(newAlbum.statusCode).toEqual(201)
    expect(newAlbum.body.datas).toHaveProperty('uuid')
    expect(newAlbum.body.datas).toHaveProperty('name')
    expect(newAlbum.body.datas).toHaveProperty('slug')
    expect(newAlbum.body.datas).toHaveProperty('descr')
    expect(newAlbum.body.datas).toHaveProperty('isPrivate')
    expect(newAlbum.body.datas).toHaveProperty('isActive')
    expect(newAlbum.body.datas).toHaveProperty('files')
    expect(newAlbum.body.datas.files.length).toEqual(1)
    expect(newAlbum.body.datas.files[0]).toHaveProperty('filename')
    expect(newAlbum.body.datas.files[0]).toHaveProperty('filepath')
    expect(newAlbum.body.datas.files[0]).toHaveProperty('uuid')
    expect(newAlbum.body.datas.files[0]).toHaveProperty('createdAt')
    expect(newAlbum.body.datas.files[0]).toHaveProperty('updatedAt')
    expect(newAlbum.body.datas.files[0]).toHaveProperty('deletedAt')
  })

  it('should create new album with admin role', async () => {
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

    // post album by admin

    const newAlbum = await request(app)
      .post('/api/albums')
      .set(adminTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('name', fakeAlbum.name)
      .field('descr', fakeAlbum.descr)
      .field('isPrivate', fakeAlbum.isPrivate)
      .attach('files', imagepath)

    expect(newAlbum.statusCode).toEqual(201)
    expect(newAlbum.body.datas).toHaveProperty('uuid')
    expect(newAlbum.body.datas).toHaveProperty('name')
    expect(newAlbum.body.datas).toHaveProperty('slug')
    expect(newAlbum.body.datas).toHaveProperty('descr')
    expect(newAlbum.body.datas).toHaveProperty('isPrivate')
    expect(newAlbum.body.datas).toHaveProperty('isActive')
    expect(newAlbum.body.datas).toHaveProperty('files')
    expect(newAlbum.body.datas.files.length).toEqual(1)
    expect(newAlbum.body.datas.files[0]).toHaveProperty('filename')
    expect(newAlbum.body.datas.files[0]).toHaveProperty('filepath')
    expect(newAlbum.body.datas.files[0]).toHaveProperty('uuid')
    expect(newAlbum.body.datas.files[0]).toHaveProperty('createdAt')
    expect(newAlbum.body.datas.files[0]).toHaveProperty('updatedAt')
    expect(newAlbum.body.datas.files[0]).toHaveProperty('deletedAt')
  })
})
