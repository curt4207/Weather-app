import React, { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import CurrentWeather from "../components/Current-Weather/current-weather";
import WeeklyForecast from "../components/WeeklyForecast";
import GeoApi from "../components/GeoApi";
import CardContainer from "../components/CardContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignIn from "../components/SignIn";
import UserProfile from "../components/UserProfile";
// import { toggleTheme } from "./_app";
import MapWrapper from "../components/MapWrapper";
import Particle from "../components/Particle";

export const Button = styled.button`
  background-color: #f2df3a;
  border: 3px solid #000;
  border-radius: 10px;
  color: #000;
  font-size: 1rem;
  margin: 5px;

  :hover {
    background-color: #000;
    color: #eaeaea;
    border: 3px solid #eaeaea;
    cursor: pointer;
  }
`;

const ThemeButton = styled.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em;
  border: 2px solid;
  background-color: darkblue;
  color: antiquewhite;

  :hover {
    color: #f2e205;
    scale: 1.2;
  }
`;

const StyledMonth = styled.h1`
  margin: 1px;
  padding: 1px;
  font-size: 3rem;
  text-align: center;
`;

const StyledContainer = styled.div`
  /* border: 2px solid black; */
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  
`;

const StyledUserContainer = styled.div`
  /* border: 2px solid green; */
  text-align: center;
  width: fit-content;
  flex-direction: column;
  font-size: 1.2rem;
`;

const StyledMapContainer = styled.div`
  border: 2px solid red;
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  
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
const Home = ({ weatherInitialFetchWeekly, weatherInitialFetchNow, setTheme, theme, loadMap }) => {
  const [weatherForecast, setWeatherForecast] = useState(weatherInitialFetchWeekly);
  const [weatherNow, setWeatherNow] = useState(weatherInitialFetchNow);
  const [signInStatus, setSignInStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [longLat, setLongLat] = useState([-97.0892, 39.7456]);
  const [map, setMap] = useState(null);
  const [mapLayerSwitch, setMapLayerSwitch] = useState(true);
  //Gets month name instead of number
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = new Date().getMonth();

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  const [mapDisplay, setMapDisplay] = useState(false);

  const toggleMap = () => {
    setMapDisplay(!mapDisplay)
  };

  return (
    <div>
      <Particle/>
      <Head>
        <title>Weather App</title>
      </Head>
      <Header>
        Rock Sparrow Weather App
        <ThemeButton type="submit" onClick={toggleTheme}>
          {" "}
          Switch Theme
        </ThemeButton>
        <SignIn signInStatus={signInStatus} setSignInStatus={setSignInStatus} setUserData={setUserData} />
        <Button onClick={toggleMap}>Map</Button>
      </Header>
      <StyledUserContainer>
        <UserProfile userData={userData} signInStatus={signInStatus} />
      </StyledUserContainer>
      <StyledContainer>
        <StyledMonth>{monthNames[month]}</StyledMonth>
        <CurrentWeather weatherNow={weatherNow} />
        <CardContainer>
          <WeeklyForecast weeklyWeather={weatherForecast} />
        </CardContainer>
      </StyledContainer>
      <StyledMapContainer>
      
      <MapWrapper longLat={longLat} map={map} setMap={setMap} mapLayerSwitch={mapLayerSwitch} setMapLayerSwitch={setMapLayerSwitch} mapDisplay={mapDisplay} setMapDisplay={setMapDisplay} />
      </StyledMapContainer>
      <Footer>
        <GeoApi
          setWeatherForecast={setWeatherForecast}
          setWeatherNow={setWeatherNow}
          userData={userData}
          signInStatus={signInStatus}
          longLat={longLat}
          setLongLat={setLongLat}
          map={map}
          mapLayerSwitch={mapLayerSwitch}
          setMapLayerSwitch={setMapLayerSwitch}
        />
      </Footer>
    </div>
  );
};

export default styled(Home)``;
