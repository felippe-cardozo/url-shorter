const config = {
  port: process.env.PORT || 3000,
  db: process.env.MONGOLAB_URI || 'mongodb://localhost/urlapi',
  testdb: 'mongodb://localhost/test',
}

module.exports = config
