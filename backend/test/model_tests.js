/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker')
const chai = require('chai')
const mongoose = require('mongoose')
const Entity = require('../models/Entity')
const User = require('../models/User')
const Preinscription = require('../models/Preinscription')
const Album = require('../models/Album')
const Event = require('../models/Event')

const { expect } = chai

const newId = new mongoose.mongo.ObjectId('6026a6db31aa34384e1c9ca5')
const newUser = {
  email: faker.internet.email(),
  password: 'Valery54',
}

const newEntity = {
  name: faker.company.companyName(),
  alias: faker.name.firstName(),
  summary: faker.company.catchPhrase(),
}

const newPre = {
  parent: newId,
  classroom: newId,
  childFirstname: faker.name.firstName(),
}

const newEvent = {
  title: faker.name.jobTitle(),
  text: `<div>${faker.lorem.sentences()}</div>`,
  place: faker.name.lastName(),
  date: new Date().getTime() / 1000,
  entity: newId,
  author: newId,
}

const newAlbum = {
  name: faker.name.lastName(),
  alias: faker.name.middleName(),
  description: faker.lorem.sentences(),
  entity: newId,
  coverpath: faker.name.title(),
  covername: faker.name.firstName(),
}

describe('MODELS', () => {
  beforeEach((done) => {
    const { users, entities, albums, preincriptions } =
      mongoose.connection.collections
    users.drop()
    entities.drop()
    albums.drop()
    preincriptions.drop()
    done()
  })

  it('should create User', async () => {
    const user = new User(newUser)
    await user.save().then((data) => {
      //   data.should.be.an('array')
      expect(data).to.be.an('object')
    })
  })

  it('should create Entity', async () => {
    const entity = new Entity(newEntity)
    await entity.save().then((data) => {
      expect(data).be.an('object')
    })
  })

  it('should create Pre-inscription', async () => {
    const pre = new Preinscription(newPre)
    await pre.save().then((data) => {
      expect(data).be.an('object')
    })
  })

  it('should create Album', async () => {
    const album = new Album(newAlbum)
    await album.save().then((data) => {
      expect(data).be.an('object')
    })
  })

  it('should create Event', async () => {
    const event = new Event(newEvent)
    await event.save().then((data) => {
      expect(data).be.an('object')
    })
  })
})
