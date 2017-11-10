const config = require('./config')
const express = require('express')
const mongoose = require('mongoose')


// connect to mongo
const mongoUrl = process.env.NODE_ENV === 'test' ? config.testdb : config.db
mongoose.connect(mongoUrl, {useMongoClient: true})
mongoose.Promise = global.Promise


// routes
const port = config.port
const app = express()
const controller = require('./controllers/urls')
app.get('/new/*', controller.new)
app.get('/:url', controller.show)
app.listen(port, console.log('listening at ' + port))

module.exports = app
