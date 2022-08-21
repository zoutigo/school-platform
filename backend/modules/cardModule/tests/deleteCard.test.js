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

const fakeRoleName = `la belle famille`

const imagepath = path.resolve(
  __dirname,
  `../../../tests/test_images/test_img1.jpg`
)

describe('CARD - DELETE', () => {
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

    // post card by admin

    const newCard = await request(app)
      .post('/api/cards')
      .set(adminTokenHeader)
      .field('name', fakeCard.name)
      .field('descr', fakeCard.descr)
      .field('path', fakeCard.path)
      .attach('files', imagepath)

    expect(newCard.statusCode).toEqual(201)

    // delete card

    const deletedCard = await request(app)
      .delete(`/api/cards/${newCard.body.datas.uuid}`)
      .set(adminTokenHeader)

    expect(deletedCard.statusCode).toEqual(200)

    const getCard = await request(app).get(
      `/api/cards/${newCard.body.datas.uuid}`
    )

    expect(getCard.statusCode).toEqual(404)
  })
})
