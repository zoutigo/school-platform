const request = require('supertest')
const path = require('path')
const { faker } = require('@faker-js/faker')
const app = require('../../../app')
const truncate = require('../../../utils/truncate')
const { user, role } = require('../../../database/models')
const slugify = require('../../../utils/slugify')
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

const imagepath1 = path.resolve(
  __dirname,
  `../../../tests/test_images/test_img1.jpg`
)
const imagepath2 = path.resolve(
  __dirname,
  `../../../tests/test_images/test_img2.jpg`
)

describe('CARD - PUT', () => {
  beforeEach(async () => {
    await truncate()
  })
  afterEach(async () => {
    await cleanDirectory(testImagesFolder)
  })

  it('should update card ', async () => {
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
      .attach('files', imagepath1)
      .attach('files', imagepath1)

    expect(newCard.statusCode).toEqual(201)

    const newCardName = 'une excellente moto'
    const newCardDescr = 'elle roule tres bien en journée'
    const newCardpath = 'elle/roule/tres/bien'

    const putCard = await request(app)
      .put(`/api/cards/${newCard.body.datas.uuid}`)
      .set(adminTokenHeader)
      .field('name', newCardName)
      .field('descr', newCardDescr)
      .field('path', newCardpath)
      .field('todeletefilesUuids', newCard.body.datas.files[0].uuid)
      .field('todeletefilesUuids', newCard.body.datas.files[1].uuid)

    expect(putCard.statusCode).toEqual(200)
    expect(putCard.body.datas).toHaveProperty('uuid')
    expect(putCard.body.datas).toHaveProperty('name')
    expect(putCard.body.datas).toHaveProperty('slug')
    expect(putCard.body.datas.slug).toEqual(slugify(newCardName))
    expect(putCard.body.datas).toHaveProperty('descr')
    expect(JSON.stringify(putCard.body.datas.descr)).toEqual(
      JSON.stringify(newCardDescr)
    )
    expect(putCard.body.datas).toHaveProperty('path')
    expect(putCard.body.datas.path).toEqual(newCardpath)
    expect(putCard.body.datas).toHaveProperty('files')
    expect(putCard.body.datas.files.length).toEqual(1)
  })
})
