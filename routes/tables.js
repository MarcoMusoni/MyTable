var express = require('express');
var router = express.Router();
var parser = express.json();

/* GET reservations for the day */
router.get('/', function (req, res, next) {
  if (req.query.selectedDate) {
    console.log('GET tables on: ' + req.query.selectedDate);
    res.render('index', { title: 'Tables' })
  } else {
    res.sendStatus(400);
  }
});

/* POST table reservation */
router.post('/', function (req, res, next) {
  var bookingInfo = JSON.parse(req.body);
  if (bookingInfo.user && bookingInfo.selectedDate && bookingInfo.table) {
    console.log('User: ' + JSON.stringify(bookingInfo.user));
    console.log('Date: ' + bookingInfo.selectedDate);
    console.log('Table: ' + JSON.stringify(bookingInfo.table));
  } else {
    res.status(400);
    res.send();
  }
});

module.exports = router;
