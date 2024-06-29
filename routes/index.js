var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { firstLogin: true });
});

/* Login procedure */
router.post("/login", function (req, res, next) {
  let loginStatus = {
    httpStatus: 200,
    firstLogin: false,
    missingData: false,
  };

  var body = req.body;
  console.info(
    new Date().toLocaleString() + " | Login attempted: " + JSON.stringify(body)
  );

  if (body.usrMail && body.usrPsw) {
    // var user = retrieveUserWithMail(body.usrMail);
  } else {
    loginStatus.httpStatus = 400;
    loginStatus.missingData = true;
  }

  res.status(loginStatus.httpStatus);
  res.render("index", loginStatus);
});

module.exports = router;
