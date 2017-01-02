'use strict'

// imports
const path = require('path')
const mongo = require('mongodb')
const express = require('express')
const app = express()

const shortener = require('./app/app.js')
const routes = require('./app/routes.js')

// connect database
const prodDB = process.env.MONGOLAB_URI
const testDB = 'mongodb://localhost:27017/url_db'
mongo.MongoClient.connect(prodDB || testDB, (err, db) => {
  let success = "MongoDB connected successfully!"
  let fail = "MongoDB was unable to connect, '" + err + "'"
  !err ? console.log(success) : console.log(fail)

  // configure db
  db.createCollection("urls", {
    capped: true,
    size: 5000,
    max: 5000
  })

  // call external files
  routes(app, db)
  shortener(app, db)
})

// start server
var port = process.env.PORT || 3000
var message = 'Server listening on port ' + port + '. . .'
app.listen(port, ()=>{ console.log(message) })
