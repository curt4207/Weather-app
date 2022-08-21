import React, { useState } from "react";
import Head from "next/head";
import CurrentWeather from "../components/Current-Weather/current-weather";
import style from "../styles/Home.module.css";
import GeoApi from "../components/GeoApi";

async function getPointData(longitude, latitude) {
  const res = await fetch(`https://api.weather.gov/points/${longitude},${latitude}`);
  const data = await res.json();

  return {
    officeId: data.properties.gridId,
    gridX: data.properties.gridX,
    gridY: data.properties.gridY,
  };
}

//Fetches weather data
export async function getServerSideProps() {
  const { officeId, gridX, gridY } = await getPointData(39.7456, -97.0892);
  const res = await fetch(`https://api.weather.gov/gridpoints/${officeId}/${gridX},${gridY}/forecast?units=us`);
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
      <CurrentWeather weatherForecast={weatherForecast} />
    </div>
  );
};

export default Home;
