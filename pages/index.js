import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import CurrentWeather from "../components/Current-Weather/current-weather";
import GeoApi from "../components/GeoApi";
import CardContainer from "../components/CardContainer";

const Button = styled.button`
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
  }
  `;

 const H1 = styled.h1`
  font-size: 3rem;
  `;
 const H2 = styled.h2`
  font-size: 1.5rem;
  `;
  
  const Wrapper = styled.div`
  box-sizing: border-box;
  border: 5px solid;
  position: fixed;
  bottom: 5px;
  border-color: black;
  background-color: blue;
max-width: fit-content; 
  `;

  const CurrentWeatherWrapper = styled.div`
    position: absolute;
    top: 3rem;
    left: 40rem;
    `;


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
    <div>
      <Head>
        <title>Weather App</title>
      </Head>
      <H1>Weather</H1>
      <H2>{monthNames[month]}</H2>
      <Wrapper>
      <Button type="submit" onClick={logWeatherData}>
        Log Data
      </Button>
      <GeoApi setWeatherForecast={setWeatherForecast} setWeatherNow={setWeatherNow} />
      </Wrapper>

      <CurrentWeatherWrapper>
        <CurrentWeather weatherNow={weatherNow} />
      </CurrentWeatherWrapper>

      <CardContainer>
        {/* replace this CurrentWeather below with 7day forecast */}
     
      </CardContainer>
    </div>
  );
};

export default styled(Home)`
`;
