'use strict'

const validator = require('valid-url')

/*      logic that controls app flow
    GET will redirect to the URL associated
    with the paired short-url in the database
    POST will generate a short URL, save it
    to the database, and return it as JSON  */
module.exports = (app, db) => {

  app.get('/:url', getShortUrl)
  app.get('/new/:url*', postShortUrl)

  function getShortUrl(req, res) {
    let url = req.params.url
    if (url != 'favicon.ico') {
      console.log("Acknowledged GET request for url '" + url + "'")

      searchDatabase(url, db, res)
    }
  }

  function searchDatabase(url, db, res) {
    let urlsCollection = db.collection("urls")
    console.log("Searching database for " + url)
    urlsCollection.findOne( {"short": url}, (err, result) => {
      if (err) throw err
      if (result) {
        console.log("Redirecting to '" + result.full + "'")
        res.redirect(result.full)
      } else {
        console.log("Short url not found")
        res.send("Not found")
      }
    })
  }

  function postShortUrl(req, res) {
    let url = req.url.slice(5)
    let randomNumber = Math.floor(Math.random() * 5000000)
    let doc = {}
    console.log("Acknowledged POST request for url '" + url + "'")

    doc["full"] = url
    doc["short"] = randomNumber.toString().substring(0, 6)

    if (validator.isWebUri(url)) {
      console.log("Valid url provided")
      createEntry(doc, db)
      res.send(doc)
    } else {
      console.log("Invalid url provided")
      res.send("Please provide a valid url, including protocol")
    }
  }

  function createEntry(o, db) {
    let urlsCollection = db.collection("urls")
    console.log("Preparing to store object '" + o + "' in the database '" + urlsCollection + "'")

    urlsCollection.save(o, (err, result) => {
      if (err) throw err
      if (result) console.log("Document saved successfully!")
    })
  }

}
