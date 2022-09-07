import React, { useState } from "react";
import Head from "next/head";
import CurrentWeather from "../components/Current-Weather/current-weather";
import style from "../styles/Home.module.css";
import WeeklyForecast from "../components/WeeklyForecast";
import GeoApi from "../components/GeoApi";
import SignIn from "../components/SignIn";
import UserProfile from "../components/UserProfile";

async function getPointData(longitude, latitude) {
  const res = await fetch(`https://api.weather.gov/points/${longitude},${latitude}`);
  const data = await res.json();
  return {
    officeId: data.properties.gridId,
    gridX: data.properties.gridX,
    gridY: data.properties.gridY,
  };
}

//Fetches weather data of Linn Kansas, used to fill in state variables
export async function getServerSideProps() {
  const { officeId, gridX, gridY } = await getPointData(39.7456, -97.0892);
  const res = await fetch(`https://api.weather.gov/gridpoints/${officeId}/${gridX},${gridY}/forecast?units=us`);
  const weatherInitialFetchWeekly = await res.json();

  const secondRes = await fetch(`https://api.weather.gov/gridpoints/${officeId}/${gridX},${gridY}/forecast/hourly?units=us`);
  const weatherInitialFetchNow = await secondRes.json();

  return {
    props: { weatherInitialFetchWeekly, weatherInitialFetchNow },
  };
}

//data props for current weather and weekly weather
const Home = ({ weatherInitialFetchWeekly, weatherInitialFetchNow }) => {
  const [weatherForecast, setWeatherForecast] = useState(weatherInitialFetchWeekly);
  const [weatherNow, setWeatherNow] = useState(weatherInitialFetchNow);
  const [signInStatus, setSignInStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  //Gets month name instead of number
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = new Date().getMonth();

  //Just console logs the weather forecast data
  const logWeatherData = () => {
    console.log("Forecast", weatherForecast);
    console.log("Now", weatherNow);
  };

  return (
    <div>
      <Head>
        <title>Weather App</title>
      </Head>
      <SignIn signInStatus={signInStatus} setSignInStatus={setSignInStatus} setUserData={setUserData} />
      <UserProfile userData={userData} signInStatus={signInStatus} />
      <h1 className={style.title}>Weather</h1>
      <button className={style.button} onClick={logWeatherData}>
        Log Data
      </button>
      <h2 className={style.monthHeading}>{monthNames[month]}</h2>
      <br />
      <GeoApi setWeatherForecast={setWeatherForecast} setWeatherNow={setWeatherNow} userData={userData} signInStatus={signInStatus} />
      <CurrentWeather weatherNow={weatherNow} />
      <WeeklyForecast weeklyWeather={weatherForecast} />
    </div>
  );
};

export default Home;
