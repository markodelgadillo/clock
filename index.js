const { MongoClient } = require('mongodb')
const express = require('express')
const app = express()
const seed = require('./seed.js')
const path = require('path')
app.use(express.static('./server/public'))

MongoClient.connect('mongodb://localhost/library', function(err, db) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const timezones = db.collection('timezones')
  app.get('/timezones', function(req, res) {
    console.log('Getting stuff...')
    timezones
      .find({}, { _id: 0 })
      .toArray()
      .then(function(timezones) {
        res.send(
          timezones.reduce((zones, document) => [...zones, document.zone], [])
        )
      })
      .catch(err => {
        console.error(err)
      })
  })

  app.listen(8888, function() {
    console.log('Listening on port 8888.')
  })
})
