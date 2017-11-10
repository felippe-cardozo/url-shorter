process.env.NODE_ENV = 'test'

const server = require('./server.js')
const request = require('supertest')
const Url = require('./models/url')

describe('new url', () => {
  it('should return 200', (done) => {
    const url = '/new/https://www.google.com'
    request(server)
      .get(url)
      .expect(200, done)
  })
})

describe("GET '/' + id", () => {
  it('should return 302, redirect', (done) => {
    let google = new Url({original_url: 'https://www.google.com'})
    google.save((err, data) => {
      if (err) throw err
      request(server).get('/' + data.id).expect(302, done)
    })
  })
})
