'use strict'

/*      logic that controls app flow
    GET will redirect to the URL associated
    with the paired short-url in the database
    POST will generate a short URL, save it
    to the database, and return it as JSON  */
module.exports = (app, db) => {

  app.get('/:url', getShortUrl)
  app.get('/new/:url', postShortUrl)

  function getShortUrl(req, res) {
    let url = req.params.url

    searchDatabase(url, db, res)
  }

  function searchDatabase(url, db, res) {

  }

  function postShortUrl(req, res) {
    let url = req.params.url
    let randomNumber = Math.floor(Math.random() * 5000000)
    randomNumber.toString().substring(0, 6)
    let doc = {}

    doc["full"] = url
    doc["short"] = randomNumber

    createEntry(doc, db)

    res.send(doc)
  }

  function createEntry(o, db) {

  }

}
