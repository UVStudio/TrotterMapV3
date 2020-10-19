const express = require('express');
const router = express.Router();
const axios = require('axios');
const weatherAPI = process.env.OPENWEATHERAPI;

//@route    GET /api/current
//@desc     get current weather info
//@access   public
router.get('/current/:id', async (req, res) => {
  let city = req.params.id;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPI}`
    );
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error(error);
  }
});

//@route    GET /api/current
//@desc     get current weather info
//@access   public
router.get('/forecast/:id', async (req, res) => {
  let city = req.params.id;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPI}`
    );
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
