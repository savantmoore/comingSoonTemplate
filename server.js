console.log('May Node be with you')

const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

// app.listen(3000, function() {
//   console.log('listening on 3000')
// })
var db

MongoClient.connect('mongodb://josvisser:holland@ds261678.mlab.com:61678/multigroep', (err, client) => {
  if (err) return console.log(err)
  db = client.db('multigroep') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/submit', (req, res) => {
  db.collection('emails').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log(req.body)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.use(express.static('public'))
