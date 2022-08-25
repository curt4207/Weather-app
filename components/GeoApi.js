import React, { useEffect, useState } from "react";
import style from "../styles/Home.module.css";

function GeoApi(props) {
  const { setWeatherForecast, setWeatherNow } = props;
  const [locationName, setLocationName] = useState("Linn, Kansas");
  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  async function fetchCoords() {
    if (API_KEY === null) {
      console.log("Geolocation API key not set.");
    }
    let firstRes = await fetch(`http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${searchTerm}`);
    let firstData = await firstRes.json();
    let searchHitIndex = 0;
    while (firstData.data[searchHitIndex].country_code !== "USA") {
      searchHitIndex++;
    }

    const long = firstData.data[searchHitIndex].longitude;
    const lat = firstData.data[searchHitIndex].latitude;
    setLocationName(firstData.data[searchHitIndex].label);

    return { long, lat };
  }

  async function fetchGrid(long, lat) {
    const secondRes = await fetch(`https://api.weather.gov/points/${lat},${long}`);
    const secondData = await secondRes.json();

    const office = secondData.properties.gridId;
    const gridX = secondData.properties.gridX;
    const gridY = secondData.properties.gridY;

    return { office, gridX, gridY };
  }

  async function fetchWeatherData(office, gridX, gridY) {
    const firstRes = await fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast/hourly?units=us`);
    const firstData = await firstRes.json().then((res) => {
      setWeatherNow(res);
    });

    const secondRes = await fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast?units=us`);
    const secondData = secondRes.json().then((res) => {
      setWeatherForecast(res);
    });
  }

  //Gets weather data when Search button clicked
  const handleSubmit = async (e) => {
    e.preventDefault();

    const longLat = fetchCoords();
    const long = (await longLat).long;
    const lat = (await longLat).lat;

    const gridData = fetchGrid(long, lat);
    const office = (await gridData).office;
    const gridX = (await gridData).gridX;
    const gridY = (await gridData).gridY;

    fetchWeatherData(office, gridX, gridY);
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
