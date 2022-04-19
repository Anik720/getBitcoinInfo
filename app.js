const inputModel = require('./models/value');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());
let value;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {}).then((con) => {
  console.log('DB connection successful');
});

app.post('/post-test', async (req, res) => {
  const input = req.body;

  const newInput = new inputModel(input);
  try {
    await newInput.save();
    res.json(newInput);
  } catch (error) {
    res.json({ message: error.json });
  }
});

app.get('/getBitcoinInfo', async(req, res) => {

  let userValue = await inputModel.find();
  const data=userValue[0].content
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/currentprice/${data}.json`,
    )
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
    res.send("ok")
});

app.listen(3000, () => {
  console.log('Successfull');
});
