var express = require('express');
var router = express.Router();

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
  
  console.log('Body: ' + JSON.stringify(req.body));
  
  if (req.body.usrPsw && req.body.usrMail) {
    console.log(req.body.usrPsw);
    console.log(req.body.usrMail);
  } else {
    res.status(400);
    res.send();
  }
});

module.exports = router;
