/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
const assert = require('assert')
const faker = require('faker')
const chai = require('chai')
const atob = require('atob')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')

const server = require('../bin/www')

// Configure chai
chai.use(chaiHttp)
chai.should()

describe('USERS', () => {
  beforeEach((done) => {
    const { users } = mongoose.connection.collections
    users.drop()
    done()
  })

  const newUser = {
    email: faker.internet.email(),
    password: 'Valery54',
    passwordConfirm: 'Valery54',
  }

  it('should register user', (done) => {
    chai
      .request(server)
      .post('/users/register')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201)
        done()
      })
  })

  it('should login user', (done) => {
    chai
      .request(server)
      .post('/users/register')
      .send(newUser)
      .end((err, res) => {
        chai
          .request(server)
          .post('/users/login')
          .send({
            email: newUser.email,
            password: newUser.password,
          })
          .end((erro, resp) => {
            const tokenString = resp.header['x-access-token'].split('.')
            const tokenDatas = JSON.parse(atob(tokenString[1]))

            resp.should.have.status(200)
            tokenDatas.should.have.all.keys(
              '_id',
              'roles',
              'exp',
              'iat',
              'isManager',
              'isAdmin',
              'isModerator',
              'isTeacher',
              'childrenClasses'
            )
            tokenDatas._id.should.not.have.lengthOf(0)
            done()
          })
      })
  })
  it('should update user by owner', (done) => {
    chai
      .request(server)
      .post('/users/register')
      .send(newUser)
      .end((err, res) => {
        chai
          .request(server)
          .post('/users/login')
          .send({
            email: newUser.email,
            password: newUser.password,
          })
          .end((erro, resp) => {
            const token = resp.header['x-access-token']
            const { _id: userId } = JSON.parse(
              atob(resp.header['x-access-token'].split('.')[1])
            )
            const data = {
              lastname: faker.name.lastName(),
              firstname: faker.name.firstName(),
              phone: '0650679834',
              gender: 'monsieur',
            }
            chai
              .request(server)
              .post(`/users?id=${userId}`)
              .set('x-access-token', token)
              .send(data)
              .end((err, respo) => {
                respo.should.have.status(200)
                done()
              })
          })
      })
  })

  it('should list users', (done) => {
    chai
      .request(server)
      .post('/users/register')
      .send(newUser)
      .end(() => {
        chai
          .request(server)
          .get('/users')
          .end((err, resp) => {
            resp.should.have.status(200)
            resp.body.should.be.a('array')
            resp.body.should.not.have.lengthOf(0)
            done()
          })
      })
  })
  it('should check email in db : case ok', (done) => {
    chai
      .request(server)
      .post('/users/register')
      .send(newUser)
      .end(() => {
        chai
          .request(server)
          .post('/users/checkemail')
          .send({ email: newUser.email })
          .end((err, resp) => {
            resp.should.have.status(200)
            done()
          })
      })
  })
})
