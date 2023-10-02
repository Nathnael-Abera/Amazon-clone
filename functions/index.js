
const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe=require("stripe")
("sk_test_51NcWfSHITG1MmXHbShBwHEMAOtYcotUSK5HR7LXx9Zxgh6pzSkG5eYLDevTPhhKZ7zwA4jf1yVRVFpaPVnXu71hP00SHjbjH06");
const app = express();
app.use(cors({origin: true}));
app.use(express.json());
app.get('/', (req, res) => { res.status(200).send('back end') });
app.post('/payments/create', async (req, res) => {
    const total = req.query.total
    // console.log(total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
});
    // console.log(paymentIntent)
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    });

})


exports.api = functions.https.onRequest(app)

//http://127.0.0.1:5001/clone-147f6/us-central1/api