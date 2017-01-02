'use strict'

// imports
const path = require('path')
const express = require('express')

module.exports = (app, db) => {
  app.get('/', (req, res) => {
    // bad bad bad
    res.sendFile(path.join(__dirname, '../views/index.html'))
  })
}
