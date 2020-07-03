const express = require('express');
const router = express.Router();
const axios = require('axios');

//@route    GET /api/current
//@desc     get current weather info
//@access   public
router.get('/current', async (req, res) => {
  let city = req.body.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfacc96b28036034f428cbe9a5293b1b`
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
router.get('/forecast', async (req, res) => {
  let city = req.body.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bfacc96b28036034f428cbe9a5293b1b`
    );
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
