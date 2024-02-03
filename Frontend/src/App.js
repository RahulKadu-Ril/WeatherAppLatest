
import { useEffect, useState } from "react";
import CurrentWeather from './Component/current-weather/currentweather';
import "./App.css";
import { FadeLoader } from "react-spinners";
import Forecast from './Component/forecast/forecast';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WEATHER_API_URL } from "./api";
import axios from "axios";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // Update the document title using the browser API
    setCurrentWeather(null);
    setForecast(null);
  }, [!city]);

  // async function success(position) {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   const cityResponse = await axios.get(`${WEATHER_API_URL}/city?lat=${latitude}&lon=${longitude}`)
  //   console.log(latitude,longitude);
  // }

  // function error() {
    
  // }

  // const getCurrentLocation = async () =>{
  //   try {
  //     setLoading(true);
  //     if (!navigator.geolocation) {
  //       toast.error('Geolocation is not supported by your browser!', {
  //         position: "top-right",
  //         autoClose: 1500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       });
  //       setLoading(false);
  //     } else {
  //       navigator.geolocation.getCurrentPosition(success, error);
  //     }
  //   } catch (error) {
      
  //   }
  // }

  const searchPressed = async () => {

    try {
      setLoading(true)
      if (!city) {
        toast.error('Please enter city name to get weather!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setLoading(false);
      }
      const weatherResponse = await axios.get(`${WEATHER_API_URL}/weather?city=${city}`);
      const forecastResponse = await axios.get(`${WEATHER_API_URL}/forecast?city=${city}`);
      console.log(weatherResponse.data);
      console.log(forecastResponse.data);
      setCurrentWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      setLoading(false)
    } catch (error) {
      if(city){
        toast.error('Please enter valid city name!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setLoading(false);
      }
      
      console.error("Error Feteching Weather: ", error);
    }
  }
  return (
    <div className="Container">

      <div>
        <div className="container">
          <ToastContainer />
          <h1>Weather App</h1>
          <div className="mini-container">
            <div><input type="text" id="city-input" placeholder="Enter city name" onChange={(e) => setCity(e.target.value)}/><button className="curr-location">Current Location</button></div>
            <div>
              {loading ? <div className="loader">
                <FadeLoader color="#36d7b7" />
              </div> :
                <button type="submit" onClick={searchPressed}>Get Weather</button>}
            </div>
          </div>
        </div>

        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
