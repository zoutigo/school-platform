const request = require('supertest')
const path = require('path')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')
const slugify = require('../../../utils/slugify')
const { testImagesFolder } = require('../../../constants/testFolders')
const cleanDirectory = require('../../../utils/cleanDirectory')

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
const imagepath2 = path.resolve(
  __dirname,
  `../../../tests/test_images/test_img2.jpg`
)

describe('ALBUM - PUT', () => {
  beforeEach(async () => {
    await truncate()
  })
  afterEach(async () => {
    await cleanDirectory(testImagesFolder)
  })

  it('should update album by user', async () => {
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

    const newAlbumName = 'une excellente moto'
    const newAlbumDescr = 'elle roule tres bien en journée'
    const newAlbumIsPrivate = false

    const putAbum = await request(app)
      .put(`/api/albums/${newAlbum.body.datas.uuid}`)
      .set(userTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('name', newAlbumName)
      .field('descr', newAlbumDescr)
      .field('isPrivate', newAlbumIsPrivate)

    expect(putAbum.statusCode).toEqual(200)
    expect(putAbum.body.datas).toHaveProperty('uuid')
    expect(putAbum.body.datas).toHaveProperty('name')
    expect(putAbum.body.datas).toHaveProperty('slug')
    expect(putAbum.body.datas.slug).toEqual(slugify(newAlbumName))
    expect(putAbum.body.datas).toHaveProperty('descr')
    expect(JSON.stringify(putAbum.body.datas.descr)).toEqual(
      JSON.stringify(newAlbumDescr)
    )
    expect(putAbum.body.datas).toHaveProperty('isPrivate')
    expect(putAbum.body.datas.isPrivate).toEqual(newAlbumIsPrivate)
    expect(putAbum.body.datas).toHaveProperty('isActive')
    expect(putAbum.body.datas).toHaveProperty('files')
    expect(putAbum.body.datas.files.length).toEqual(1)
  })

  it('should put album by admin', async () => {
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

    const newAlbumName = 'une excellente moto'
    const newAlbumDescr = 'elle roule tres bien en journée'
    const newAlbumIsPrivate = false

    const putAbum = await request(app)
      .put(`/api/albums/${newAlbum.body.datas.uuid}`)
      .set(adminTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('name', newAlbumName)
      .field('descr', newAlbumDescr)
      .field('isPrivate', newAlbumIsPrivate)

    expect(putAbum.statusCode).toEqual(200)
    expect(putAbum.body.datas).toHaveProperty('uuid')
    expect(putAbum.body.datas).toHaveProperty('name')
    expect(putAbum.body.datas).toHaveProperty('slug')
    expect(putAbum.body.datas.slug).toEqual(slugify(newAlbumName))
    expect(putAbum.body.datas).toHaveProperty('descr')
    expect(JSON.stringify(putAbum.body.datas.descr)).toEqual(
      JSON.stringify(newAlbumDescr)
    )
    expect(putAbum.body.datas).toHaveProperty('isPrivate')
    expect(putAbum.body.datas.isPrivate).toEqual(newAlbumIsPrivate)
    expect(putAbum.body.datas).toHaveProperty('isActive')
    expect(putAbum.body.datas).toHaveProperty('files')
    expect(putAbum.body.datas.files.length).toEqual(1)
  })
  it('should put album file by admin and remove file', async () => {
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
      .attach('files', imagepath2)

    const newAlbumName = 'une excellente moto'
    const newAlbumDescr = 'elle roule tres bien en journée'
    const newAlbumIsPrivate = false
    // const toBeRemovedFiles = Array(newAlbum.body.datas.files[0].uuid)

    const putAbum = await request(app)
      .put(`/api/albums/${newAlbum.body.datas.uuid}`)
      .set(adminTokenHeader)
      .field('entityUuid', newEntity.body.datas.uuid)
      .field('name', newAlbumName)
      .field('descr', newAlbumDescr)
      .field('isPrivate', newAlbumIsPrivate)
      .field('todeletefilesUuids', newAlbum.body.datas.files[0].uuid)
      .field('todeletefilesUuids', newAlbum.body.datas.files[1].uuid)
      .attach('files', imagepath2)

    expect(putAbum.statusCode).toEqual(200)
    expect(putAbum.body.datas).toHaveProperty('uuid')
    expect(putAbum.body.datas).toHaveProperty('name')
    expect(putAbum.body.datas).toHaveProperty('slug')
    expect(putAbum.body.datas.slug).toEqual(slugify(newAlbumName))
    expect(putAbum.body.datas).toHaveProperty('descr')
    expect(JSON.stringify(putAbum.body.datas.descr)).toEqual(
      JSON.stringify(newAlbumDescr)
    )
    expect(putAbum.body.datas).toHaveProperty('isPrivate')
    expect(putAbum.body.datas.isPrivate).toEqual(newAlbumIsPrivate)
    expect(putAbum.body.datas).toHaveProperty('isActive')
    expect(putAbum.body.datas).toHaveProperty('files')
    expect(putAbum.body.datas.files.length).toEqual(1)
  })
})
