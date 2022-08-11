const { faker } = require('@faker-js/faker')
const truncate = require('../../utils/truncate')
const { user } = require('../models')

const fakeUser = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  password: 'Geremy65',
  phone: '0650597839',
}

describe('MODEL: user', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create new user', async () => {
    const { dataValues: newUser } = await user.create(fakeUser)
    expect(newUser).toHaveProperty('uuid')
    expect(newUser).toHaveProperty('updatedAt')
    expect(newUser).toHaveProperty('createdAt')
    expect(newUser).toHaveProperty('isVerified')
    expect(newUser).toHaveProperty('losspassToken')
  })
  it('should find user', async () => {
    const newUser = await user.create(fakeUser)
    const newUserUuid = newUser.getDataValue('uuid')
    const foundUser = await user.findOne({ where: { uuid: newUserUuid } })

    expect(foundUser).toHaveProperty('uuid')
    expect(foundUser).toHaveProperty('updatedAt')
    expect(foundUser).toHaveProperty('createdAt')
    expect(foundUser).toHaveProperty('isVerified')
    expect(foundUser).toHaveProperty('losspassToken')
  })
  it('update user', async () => {
    const newUser = await user.create(fakeUser)
    const updatedUser = await newUser.update({ lastname: 'remi' })

    expect(updatedUser.getDataValue('lastname')).toEqual('remi')
    expect(updatedUser.getDataValue('createdAt')).not.toEqual('updatedAt')
  })
  it('delete user', async () => {
    const newUser = await user.create(fakeUser)
    const destroyedUser = await newUser.destroy()

    expect(destroyedUser.getDataValue('deletedAt')).not.toBeNull()
  })
})
