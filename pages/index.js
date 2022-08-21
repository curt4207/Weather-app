import React, { useState } from "react";
import Head from "next/head";
import style from "../styles/Home.module.css";
import GeoApi from "../components/GeoApi";

//Default location
const defaultEndpoint = `https://api.weather.gov/gridpoints/OKX/32,34/forecast?units=us`;

//Fetches weather data
export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const weatherData = await res.json();

  return {
    props: { weatherData },
  };
}

//data prop contains all the weather forecast info
const Home = ({ weatherData }) => {
  const [weatherForecast, setWeatherForecast] = useState(weatherData);
  //Gets month name instead of number
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = new Date().getMonth();

  //Just console logs the weather forecast data
  const logWeatherData = () => {
    console.log(weatherForecast);
  };

  return (
    <div>
      <Head>
        <title>Weather App</title>
      </Head>
      <h1 className={style.title}>Weather</h1>
      <button className={style.button} onClick={logWeatherData}>
        Log Data
      </button>
      <h2 className={style.smallHeading}>{monthNames[month]}</h2>
      <br />

      <GeoApi weatherForecast={weatherForecast} setWeatherForecast={setWeatherForecast} />

      <ul className={style.grid}>
        <li>Loading...</li>
      </ul>
    </div>
  );
};

export default Home;
