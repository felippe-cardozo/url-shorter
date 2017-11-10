const Url = require('../models/url')
const url = require('url')

exports.show = (req, res) => {
  const url = req.params.url
  Url.findOne({ _id: url }, (err, data) => {
    if (err) throw err
    if (data) {
      res.redirect(data.original_url)
    }
    else { res.json({
      'error': 'This url is not in the database'
    }) }
  })
}

exports.new = (req, res) => {
  const url = req.params[0]
  if (!urlValidator(url))
    return res.json({
      'error':
      'Wrong url format, make sure you have a valid protocol and real site.'
    })
  Url.findOne({original_url: url}, (err, data) => {
    if (err) throw err
    if (data) res.json({
      'original_url': data.original_url,
      'short_url': req.get('host') + '/' + data.id
    })
    else {
      let newUrl = new Url({original_url: url})
      newUrl.save((err, data) => {
        if (err) throw err
        res.json({
          'original_url': data.url,
          'short_url': req.get('host') + '/' + data.id
        })
      })
    }
  })
}


function urlValidator(userUrl) {
  const testUrl = url.parse(userUrl)
  if (testUrl.hostname) return true
  return false
}
