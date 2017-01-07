'use strict'

// imports
const path = require('path')

// display 'index.html' on root request
module.exports = (app, db) => {
  app.get('/', (req, res) => {
    // bad bad bad
    res.sendFile(path.join(__dirname, '../views/index.html'))
  })

  app.get('/database', (req, res) => {
    db.collection("urls", (err, col) => {
      col.find().toArray((err, docs) => {
        console.log(docs)
        res.send(docs)
      })
    })
  })
}
