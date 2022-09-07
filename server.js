require('dotenv').config()

const express = require('express');
const axios = require('axios');
const helpers = require('./helpers');
const app = express();
app.use(express.json());
const port = process.env.PORT;
const connectDB = require('./db');
const Reservation = require('./model/ReservationModel');
const path = require("path");

connectDB();

let pricelist = {};

async function getPriceList() {
    try {
        const response = await axios.get(process.env.PRICELIST_URL);
        pricelist = response.data;
        console.log('Have pricelist, valid until: ' + response.data.validUntil);
    } catch (error) {
        console.error(error);
        pricelist = {};
    }
    setTimeout(getPriceList, 30 * 60 * 1000);
}

getPriceList();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/pricelist', (req, res) => {
    res.send(pricelist);
  });
  
app.post('/get-route', (req, res) => {
    const {startPlanet, endPlanet, searchType} = req.body;
    var route = helpers.getRoute(pricelist, startPlanet, endPlanet, searchType);
    res.send(route);
});

app.get('/all-planets', (req, res) => {
    res.send(helpers.PLANETS);
});

app.get('/reservations', async (req, res) => {
    res.send(await Reservation.find({}));
});
app.post('/reservations', async (req, res) => {
    const { checkedFlights, reservationDate, customerInfo } = req.body;
    var reservation = await Reservation.create({
        firstName: customerInfo?.firstName,
        lastName: customerInfo?.lastName,
        checkedFlights,
        reservationDate
    });
    res.send(reservation);
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });    
}
