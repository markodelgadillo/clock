const { MongoClient } = require('mongodb')

const seed = (module.exports = MongoClient.connect(
  'mongodb://localhost/library',
  function(err, db) {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    const timezones = db.collection('timezones')
    timezones.deleteMany()

    timezones.insertMany([
      {
        id: 0,
        zone: 'Europe/Paris'
      },

      {
        id: 1,
        zone: 'Asia/Manila'
      },

      {
        id: 2,
        zone: 'America/Mexico_City'
      },

      {
        id: 3,
        zone: 'Antarctica/Troll'
      },

      {
        id: 4,
        zone: 'Asia/Almaty'
      },

      {
        id: 5,
        zone: 'America/Adak'
      },

      {
        id: 6,
        zone: 'America/Godthab'
      },

      {
        id: 7,
        zone: 'Atlantic/Azores'
      },

      {
        id: 8,
        zone: 'Indian/Christmas'
      }
    ])
    db.close()
  }
))
