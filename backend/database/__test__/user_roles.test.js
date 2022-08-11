const { faker } = require('@faker-js/faker')
const slugify = require('../../utils/slugify')
const truncate = require('../../utils/truncate')
const { role, user } = require('../models')

const roleName = 'enseignant ps'
const fakeRole0 = {
  name: roleName,
  descr: faker.lorem.sentence(),
}
const fakeRole1 = {
  name: 'les vrais pigeons',
  descr: 'ils ne se cacheront plus jamais',
}

const fakeUser = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  password: 'Geremy65',
  phone: '0650597839',
}

describe('MODEL: user_roles', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should add user roles', async () => {
    const newUser = await user.build(fakeUser).save()
    const newRole0 = await role.build(fakeRole0).save()
    const newRole1 = await role.build(fakeRole1).save()

    await newUser.addRole(newRole0)
    await newUser.addRole(newRole1)

    const userRoles = await newUser.getRoles({
      nest: true,
    })

    expect(userRoles.length).toEqual(2)
  })
  it('should remove user roles', async () => {
    const newUser = await user.build(fakeUser).save()
    const newRole0 = await role.build(fakeRole0).save()
    const newRole1 = await role.build(fakeRole1).save()

    await newUser.addRole(newRole0)
    await newUser.addRole(newRole1)

    const toberemovedRole = await role.findOne({
      where: { slug: slugify(roleName) },
    })
    await newUser.removeRole(toberemovedRole)

    const userRoles = await newUser.getRoles()
    expect(userRoles.length).toEqual(1)
  })
})
