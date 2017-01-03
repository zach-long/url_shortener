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
    let links = db.collection("urls")

    console.log("Searching database: " + links.find())
    console.log("Looking for 'short' " + url)
    links.findOne({ "short": url }, (err, result) => {
      if (err) throw err
      if (result) { res.redirect(result["full"]) }
    })
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
    let links = db.collection("urls")

    console.log("Saved to database! " + o.short + " -> " + o.full)

    links.save(o, (err, res) => {
      !err ? console.log("Entry saved to database") : console.log(err)
    })
  }

}
