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
const fakeCard1 = {
  name: 'une ancienne carte',
  descr: faker.lorem.sentence(2),
  path: '/une/nouvelle/carte/ancienne',
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

const imagepath1 = path.resolve(
  __dirname,
  `../../../tests/test_images/test_img1.jpg`
)

describe('CARD - LIST', () => {
  beforeEach(async () => {
    await truncate()
  })

  afterEach(async () => {
    await cleanDirectory(testImagesFolder)
  })

  it('should return one card', async () => {
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

    // post card by admin

    const newCard = await request(app)
      .post('/api/cards')
      .set(adminTokenHeader)
      .field('name', fakeCard.name)
      .field('descr', fakeCard.descr)
      .field('path', fakeCard.path)
      .attach('files', imagepath1)

    expect(newCard.statusCode).toEqual(201)

    const newCard1 = await request(app)
      .post('/api/cards')
      .set(adminTokenHeader)
      .field('name', fakeCard1.name)
      .field('descr', fakeCard1.descr)
      .field('path', fakeCard1.path)
      .attach('files', imagepath1)

    expect(newCard1.statusCode).toEqual(201)

    // post card by user

    const listCards = await request(app).get(`/api/cards`)

    expect(listCards.statusCode).toEqual(200)
    expect(listCards.body.datas.length).toEqual(2)

    expect(listCards.body.datas[0]).toHaveProperty('uuid')
    expect(listCards.body.datas[0]).toHaveProperty('name')
    expect(listCards.body.datas[0]).toHaveProperty('slug')
    expect(listCards.body.datas[0]).toHaveProperty('descr')
    expect(listCards.body.datas[0]).toHaveProperty('path')
    expect(listCards.body.datas[0]).toHaveProperty('files')
    expect(listCards.body.datas[0].files.length).toEqual(1)
    expect(listCards.body.datas[0].files[0]).toHaveProperty('filename')
    expect(listCards.body.datas[0].files[0]).toHaveProperty('filepath')
    expect(listCards.body.datas[0].files[0]).toHaveProperty('uuid')
    expect(listCards.body.datas[0].files[0]).toHaveProperty('createdAt')
    expect(listCards.body.datas[0].files[0]).toHaveProperty('updatedAt')
    expect(listCards.body.datas[0].files[0]).toHaveProperty('deletedAt')
  })
})
