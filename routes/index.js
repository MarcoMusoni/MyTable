var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* Login procedure */
router.post("/login", function (req, res, next) {
  let resStatus = 200;
  let loginStatus = {
    missingData: false
  };

  var body = req.body;
  console.info(
    new Date().toLocaleString() + " | Login attempted: " + JSON.stringify(body)
  );

  if (body.usrMail && body.usrPsw) {
    // var user = retrieveUserWithMail(body.usrMail);
  } else {
    resStatus = 400;
    loginStatus.missingData = true;
  }

  res.status(resStatus).send(loginStatus);
});

module.exports = router;
