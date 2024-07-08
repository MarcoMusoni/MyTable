const { MongoClient, ObjectId } = require("mongodb");

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.query.date) {
        retrieveReservationsFor(req.query.date)
            .then((reservations) => {
                res.status(200).json(reservations);
                return;
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
                return;
            });
    } else {
        res.sendStatus(400);
        return;
    }
});

const uri = "mongodb://localhost:27017/MyTable";

async function retrieveReservationsFor(date) {
    let reservations = [];
    const client = new MongoClient(uri);
    const book = client.db().collection("Book");

    const query = { date: { $eq: date } };

    try {
        const cursor = book.find(query);

        let reservation;
        while (await cursor.hasNext()) {
            reservation = await cursor.next();
            reservations.push(reservation.table_name);
        }
        await cursor.close();
    } finally {
        client.close();
    }

    console.log(JSON.stringify(reservations));
    return reservations;
}

module.exports = router;