const { MongoClient, ObjectId } = require("mongodb");

var express = require('express');
var router = express.Router();

/* GET /tables page */
router.get('/', function (req, res, next) {
  if (req.query.uid) {
    retrieveUserByUid(req.query.uid)
      .then((user) => {
        if (user) {
          let today = new Date(Date.now());
          res.render("tables", {
            dates: getDates(today)
          });
          return;
        } else {
          res.sendStatus(403);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
    return;
  }
});

function getDates(today) {
  let dates = [],
    lastDay = false,
    day = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  dates.push(new Date(year, month, day).toLocaleDateString());
  for (let i = 0; i < 4; i++) {
    switch (month) {
      case 3, 5, 9, 10:
        lastDay = day === 30;
        break;
      case 1:
        lastDay = day === 29 || day === 28;
        break;
      default:
        lastDay = day === 31;
    }
    if (lastDay) {
      if (month === 12) {
        year++;
        month = 1;
      } else {
        month++;
      }
      day = 1;
    } else {
      day++;
    }
    dates.push(new Date(year, month, day).toLocaleDateString());
  }

  return dates;
}

const uri = "mongodb://localhost:27017/MyTable";

async function retrieveUserByUid(uid) {
  const client = new MongoClient(uri);
  const users = client.db().collection("Users");

  const query = { _id: new ObjectId(uid) };

  try {
    return await users.findOne(query);
  } finally {
    client.close();
  }
}

module.exports = router;
