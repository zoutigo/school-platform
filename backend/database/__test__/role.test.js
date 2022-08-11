const { faker } = require('@faker-js/faker')
const truncate = require('../../utils/truncate')
const { role } = require('../models')

const roleName = 'enseignant ps'
const slugifiedRoleName = 'enseignant-ps'
const fakeRole = {
  name: roleName,
  descr: faker.lorem.sentence(),
}
const fakeRole1 = {
  name: 'les vrais pigeons',
  descr: 'ils ne se cacheront plus jamais',
}

describe('MODEL: role', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create new role', async () => {
    const newRole = await role.create(fakeRole)

    expect(newRole).toHaveProperty('uuid')
    expect(newRole).toHaveProperty('name')
    expect(newRole).toHaveProperty('slug')
    expect(newRole).toHaveProperty('descr')
    expect(newRole).toHaveProperty('createdAt')
    expect(newRole).toHaveProperty('updatedAt')
    expect(newRole.getDataValue('name')).toEqual(roleName)
    expect(newRole.getDataValue('slug')).toEqual(slugifiedRoleName)
  })
  it('should find role', async () => {
    const newRole = await role.create(fakeRole)
    const newRoleUuid = newRole.getDataValue('uuid')
    const foundRole = await role.findOne({ where: { uuid: newRoleUuid } })

    expect(foundRole).toHaveProperty('uuid')
    expect(foundRole.getDataValue('name')).toEqual(roleName)
  })
  it('should list roles', async () => {
    await role.create(fakeRole)
    await role.create(fakeRole1)

    const foundRoles = await role.findAll()

    expect(foundRoles.length).toEqual(2)
  })
  it('update role', async () => {
    const newRole = await role.create(fakeRole)
    const updatedRole = await newRole.update({ name: 'remi' })

    expect(updatedRole.getDataValue('name')).toEqual('remi')
    expect(updatedRole.getDataValue('createdAt')).not.toEqual('updatedAt')
  })
  it('delete role', async () => {
    const newRole = await role.create(fakeRole)
    const destroyedEntity = await newRole.destroy()

    expect(destroyedEntity.getDataValue('deletedAt')).not.toBeNull()
  })
})
