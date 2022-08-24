import React, { useEffect, useState } from "react";
import style from "../styles/Home.module.css";

function GeoApi(props) {
  const { weatherForecast, setWeatherForecast } = props;
  const [locationName, setLocationName] = useState("Linn, Kansas");
  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //Just keeping this function to help with development, will delete later
  async function fetchCoords() {
    if (API_KEY === null) {
      console.log("Geolocation API key not set.");
    }
    let firstRes = await fetch(`http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${searchTerm}`);
    let firstData = await firstRes.json();
    let a = 0;
    while (firstData.data[a].continent !== "North America") {
      a++;
    }
    const long = firstData.data[a].longitude;
    const lat = firstData.data[a].latitude;
    console.log(a, firstData);
    return { long, lat };
  }

  //Gets weather data when Search button clicked
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Step 1 -  Fetches the longitude and latitude
    let long = 0;
    let lat = 0;
    let a = 0;

    const firstRes = await fetch(`http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${searchTerm}`);
    const firstData = await firstRes.json().then((firstData) => {
      while (firstData.data[a].continent !== "North America") {
        a++;
      }
      long = firstData.data[a].longitude;
      lat = firstData.data[a].latitude;
      setLocationName(firstData.data[a].label);
    });

    //Step 2 - Fetches grid data
    const secondRes = await fetch(`https://api.weather.gov/points/${lat},${long}`);
    const secondData = await secondRes.json();

    const office = secondData.properties.gridId;
    const gridX = secondData.properties.gridX;
    const gridY = secondData.properties.gridY;
    console.log(office, gridX, gridY);

    //Step 3 - Fetches weather forecast data
    const finalRes = await fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast?units=us`);
    const data = finalRes.json().then((res) => {
      setWeatherForecast(res);
    });
  };

  return (
    <div className={style.geo}>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <button onClick={fetchCoords}>Coordinates</button>
      <p>{locationName}</p>
    </div>
  );
}

export default GeoApi;
