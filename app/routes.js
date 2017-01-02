'use strict'

// imports
const path = require('path')

// display 'index.html' on root request
module.exports = (app, db) => {
  app.get('/', (req, res) => {
    // bad bad bad
    res.sendFile(path.join(__dirname, '../views/index.html'))
  })
}
