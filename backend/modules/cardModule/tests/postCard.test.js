const request = require('supertest')
const path = require('path')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')
const { testImagesFolder } = require('../../../constants/testFolders')
const cleanDirectory = require('../../../utils/cleanDirectory')

const fakeCard = {
  name: 'une nouvelle carte',
  descr: faker.lorem.sentence(2),
  path: '/une/nouvelle/carte',
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

const imagepath = path.resolve(
  __dirname,
  `../../../tests/test_images/test_img1.jpg`
)

describe('CARD - POST', () => {
  beforeEach(async () => {
    await truncate()
  })
  afterEach(async () => {
    await cleanDirectory(testImagesFolder)
  })

  it('should return statuscode 401 if no logged', async () => {
    const newCard = await request(app)
      .post('/api/cards')
      .send({
        ...fakeCard,
      })

    expect(newCard.statusCode).toEqual(401)
  })

  it('should create new card with admin role', async () => {
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

    // post card by admin

    const newCard = await request(app)
      .post('/api/cards')
      .set(adminTokenHeader)
      .field('name', fakeCard.name)
      .field('descr', fakeCard.descr)
      .field('path', fakeCard.path)
      .attach('files', imagepath)

    expect(newCard.statusCode).toEqual(201)
    expect(newCard.body.datas).toHaveProperty('uuid')
    expect(newCard.body.datas).toHaveProperty('name')
    expect(newCard.body.datas).toHaveProperty('slug')
    expect(newCard.body.datas).toHaveProperty('descr')
    expect(newCard.body.datas).toHaveProperty('path')
    expect(newCard.body.datas).toHaveProperty('files')
    expect(newCard.body.datas.files.length).toEqual(1)
    expect(newCard.body.datas.files[0]).toHaveProperty('filename')
    expect(newCard.body.datas.files[0]).toHaveProperty('filepath')
    expect(newCard.body.datas.files[0]).toHaveProperty('uuid')
    expect(newCard.body.datas.files[0]).toHaveProperty('createdAt')
    expect(newCard.body.datas.files[0]).toHaveProperty('updatedAt')
    expect(newCard.body.datas.files[0]).toHaveProperty('deletedAt')
  })
})
