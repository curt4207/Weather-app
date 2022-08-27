import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import CurrentWeather from "../components/Current-Weather/current-weather";
import GeoApi from "../components/GeoApi";

export const Button = styled.button`
    background-color: #f2df3a;
    border: 3px solid #000;
    border-radius: 10px;
    color: #000;
    font-size: 25px;
    margin: 5px;
  
  :hover {
    background-color: #000;
    color: #eaeaea;
    border: 3px solid #eaeaea;
    cursor: pointer;
  }`
export const H1 = styled.h1`
  font-size: 3rem`
export const H2 = styled.h2`
  font-size: 1.5rem`

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
  //Gets month name instead of number
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = new Date().getMonth();

  //Just console logs the weather forecast data
  const logWeatherData = () => {
    console.log("Forecast", weatherForecast);
    console.log("Now", weatherNow);
  };

  return (
    <div >
      <Head>
        <title>Weather App</title>
      </Head>
      <H1>Weather</H1>
      <Button type="submit" onClick={logWeatherData}>
        Log Data
      </Button>
      <H2>{monthNames[month]}</H2>
      <br />
      <GeoApi setWeatherForecast={setWeatherForecast} setWeatherNow={setWeatherNow} />
      <CurrentWeather weatherNow={weatherNow} />
    </div>
  );
};

export default styled(Home)`
`;
