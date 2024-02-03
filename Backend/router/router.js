const express=require("express")
const app=express()
const router=express.Router()
const axios = require('axios');


var currentWeatherData;
var currentCache = new Map();
var weatherData;

var forecastweatherData;
var forecastCache = new Map();
var weatherData1;


router.get("/weather", async (req, res) => {
  try {
    const city = req.query.city;
    if (currentCache.has(city)) {
      console.log("Fetching from Cache...");
      res.status(200).json(currentCache.get(city).temperature); 
    } else{
      const weatherResponse = await axios.get(
        `${process.env.API_URI}/weather?q=${city}&units=metric&&appid=${process.env.API_KEY}`
      );
      weatherData = {
        temperature: weatherResponse.data,
      };
      currentWeatherData = weatherData;
      currentCache.set(city, currentWeatherData);
      console.log("Fetching from Api...");
      
      res.status(200).json(weatherData.temperature);
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Fetching Weather" });
  }
});

// FORECAST

router.get("/forecast", async (req, res) => {
  try {
    const city = req.query.city;
    if (forecastCache.has(city)) {
      console.log("Fetching from Cache...")
      res.status(200).json(forecastCache.get(city).temperature);
    } else {
      const forecastResponse = await axios.get(
        `${process.env.API_URI}/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`
      );
      weatherData1 = {
        temperature: forecastResponse.data,
      };
      forecastweatherData = weatherData1;
      forecastCache.set( city, forecastweatherData);
      console.log("Fetching from Api...")
      res.status(200).json(weatherData1.temperature);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Fetching Weather" });
  }

});

module.exports=router