const mongoose = require('mongoose')
const shortid = require('shortid')

const Url = mongoose.model('Url', {
  original_url: String,
  _id: {
    type: String,
    'default': shortid.generate()
  }
})

module.exports = Url
