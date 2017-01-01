'use strict'

// imports
const path = require('path')
const mongo = require('mongodb')
const express = require('express')
const app = express()

const shortener = require('./app/app.js')

// link views
app.set()
app.set()

// connect database
mongo.MongoClient.connect('mongodb://localhost:27017/url_shortener', (err, db) => {
  let success = "MongoDB connected successfully!"
  let fail = "MongoDB was unable to connect"
  !err ? success : fail

  // configure db

  // call external files
})

// start server
var port = process.env.PORT || 3000
var message = 'Server listening on port ' + port + '. . .'
app.listen(port, ()=>{ console.log(message) })
