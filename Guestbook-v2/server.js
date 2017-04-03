 //server.js
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('views'));

var db;



//Defining root route
app.get('/', function(req, res) {
  res.render('pages/index', {
    //This was a part of the assignment to make new headings for the index page.
    new_heading: "Quote of the Day",
    new_paragraph: "I have a great relationship with the Mexican people",
    new_author: "Donald Trump"
  });
});
//Guestbook Route
app.get('/guests', function(req, res) {
  db.collection('guests').find().toArray(function (err, result) {
  if (err) return console.log(err);

  res.render('pages/guestbook', {guests: result});
});
});

//Route for a new message
app.get('/newmessage', function(req, res) {

db.collection('guests', function(err, collection) {
  collection.distinct('guestnumber', function (err, items) {
    console.log(items);

      res.render('pages/newmessage', {guests: items});
  });
});
});

//Route for the admin page
app.get('/admin', function(req, res, next) {

  db.collection('guests').find().toArray(function (err, result) {
  if (err) return console.log(err);

  res.render('pages/adminbook', {guests: result});
  });
});


//function for deleting messages
app.delete('/guests', (req, res) => {
  db.collection('guests').findOneAndDelete({guestnumber: req.body.guestnumber},
    (err, result) => {
    if (err) return res.send(500, err);
    res.json('Deleted!!');
  });
});


//Method for Posting the form info to database
app.post('/guests', function (req, res) {
 db.collection('guests').save(req.body, function (err, result) {
   if (err) return console.log(err);

   console.log('Saved to database');
 });
 res.sendFile(__dirname + '/views/pages/success.html');
});


//Connecting to mongodb
MongoClient.connect('mongodb://user:password@ds143340.mlab.com:43340/guestbook', (err, database) => {
  //start server.
  if (err) return console.log(err);
  db = database;

  app.listen(8081, () => {
      console.log('app listening on port 8081');
  });
});


//404 Errors if any occur
app.get('*', function (req,res) {
  res.status(404).send("<h1>Can't find requested page</h1>");
});
