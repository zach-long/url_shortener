'use strict'

// imports
const mongodb = require('mongodb').MongoClient
const express = require('express')
const app = express()

const shortener = require('./app/app.js')
const routes = require('./app/routes.js')

// connect database
const prodDB = process.env.MONGODB_URI
const testDB = 'mongodb://localhost:27017/url_db'
mongodb.connect(prodDB || testDB, (err, db) => {
  const success = "MongoDB connected successfully!"
  const fail = "MongoDB was unable to connect, '" + err + "'"
  !err ? console.log(success) : console.log(fail)
console.log(process.env)
  // configure db
  db.createCollection("urls", {
    capped: true,
    size: 5000000,
    max: 5000
  })
  console.log("Created collection 'urls'")

  // call external files
  routes(app, db)
  shortener(app, db)
})

// start server
var port = process.env.PORT || 3000
var message = 'Server listening on port ' + port + '. . .'
app.listen(port, ()=>{ console.log(message) })
