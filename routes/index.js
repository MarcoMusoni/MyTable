const { MongoClient } = require("mongodb");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// login handler
router.post("/login", function (req, res, next) {
  console.info(
    new Date().toLocaleString() +
    " | Login attempted: " +
    JSON.stringify(req.body)
  );

  if (!req.body.usrMail || !req.body.usrPsw) {
    res.status(400).json({ error: "missing data" });
    return;
  }

  retrieveUserByMail(req.body.usrMail)
    .then((user) => {
      if (user) {
        //check if password matches
        const result = req.body.usrPsw === user.password;
        if (result) {
          res.status(200).json({ uid: user._id });
        } else {
          res.status(401).json({ error: "password doesn't match" });
        }
      } else {
        res.status(404).json({ error: "user doesn't exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: null });
    });
});

/**
 * User CRUD
 */

const uri = "mongodb://localhost:27017/MyTable";

async function retrieveUserByMail(email) {
  const client = new MongoClient(uri);
  const users = client.db().collection("Users");

  const query = { email: email };

  try {
    return await users.findOne(query);
  } finally {
    client.close();
  }
}

module.exports = router;
