var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// login handler
router.post("/login", async function (req, res, next) {

  console.info(
    new Date().toLocaleString() + " | Login attempted: " + JSON.stringify(req.body)
  );

  if (!req.body.usrMail || !req.body.usrPsw) {
    res.status(400).json({ error: 'missing data' });
    return;
  }

  try {
    // check if the user exists
    let user = null;

    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        res.render("tables");
      } else {
        res.status(401).json({ error: "password doesn't match" });
      }
    } else {
      res.status(404).json({ error: "user doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

/**
 * User CRUD
 */

const uri = "mongodb://localhost:27017/MyTable";

async function retrieveUser(email) {
  const client = new MongoClient(uri);
  const users = client.db().collection("Users");

  const query = { mail: email };

  try {
    return await users.findOne(query);
  } finally {
    client.close();
  }
}

module.exports = router;
