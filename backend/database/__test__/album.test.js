const { faker } = require('@faker-js/faker')
const slugify = require('../../utils/slugify')
const truncate = require('../../utils/truncate')
const { entity, album } = require('../models')

const entityName = 'la vie est belle'
const albumName = 'le meilleur album'
const fakeEntity = {
  name: entityName,
  email: faker.internet.email(),
  content: faker.lorem.paragraphs(2, '<br/>\n'),
}

const fakeAlbum = {
  name: albumName,
  descr: faker.lorem.sentence(1),
}

describe('MODEL: album', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create new album', async () => {
    const newAlbum = await album.create(fakeAlbum)

    expect(newAlbum).toHaveProperty('uuid')
    expect(newAlbum).toHaveProperty('name')
    expect(newAlbum).toHaveProperty('slug')
    expect(newAlbum).toHaveProperty('isActive')
    expect(newAlbum).toHaveProperty('isPrivate')
    expect(newAlbum).toHaveProperty('createdAt')
    expect(newAlbum).toHaveProperty('updatedAt')
    expect(newAlbum).toHaveProperty('deletedAt')
    expect(newAlbum.getDataValue('slug')).toEqual(slugify(albumName))
  })

  it('should find album', async () => {
    const newAlbum = await album.create(fakeAlbum)
    const newAlbumUuid = newAlbum.getDataValue('uuid')
    const foundEntity = await album.findOne({ where: { uuid: newAlbumUuid } })

    expect(foundEntity).toHaveProperty('uuid')
    expect(foundEntity.slug).toEqual(slugify(albumName))
  })
  it('should update album', async () => {
    const newAlbum = await album.create(fakeAlbum)
    const updatedAlbum = await newAlbum.update({ name: 'le bon port' })

    expect(updatedAlbum.getDataValue('slug')).toEqual('le-bon-port')
    expect(updatedAlbum.getDataValue('createdAt')).not.toEqual('updatedAt')
  })

  it('should create new entity', async () => {
    const newAlbum = await album.create(fakeAlbum)
    await newAlbum.createEntity(fakeEntity)

    const newAlbumEntity = await newAlbum.getEntity()

    expect(newAlbumEntity.getDataValue('alias')).toEqual(slugify(entityName))
  })
})
