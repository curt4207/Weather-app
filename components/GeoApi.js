import React, { useEffect, useState } from "react";
import { resolve } from "styled-jsx/css";
import style from "../styles/Home.module.css";

function GeoApi(props) {
  const { weatherForecast, setWeatherForecast } = props;
  const [locationName, setLocationName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  async function fetchCoords() {
    let long = 0;
    let lat = 0;
    let firstRes = await fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}&query=${searchTerm}`);
    let firstData = await firstRes.json();
    let a = 0;
    while (firstData.data[a].continent !== "North America") {
      a++;
    }
    long = firstData.data[a].longitude;
    lat = firstData.data[a].latitude;
    console.log(a, firstData);
  }

  async function fetchGrid(long, lat) {
    const res = await fetch(`https://api.weather.gov/points/${lat},${long}`);
    const data = await res.json();
    // console.log(data);
    setGrid({
      office: data.properties.gridId,
      gridX: data.properties.gridX,
      gridY: data.properties.gridY,
    });
  }

  async function fetchWeatherForecast() {
    const res = await fetch(`https://api.weather.gov/gridpoints/${grid.office}/${parseInt(grid.gridX, 10)},${parseInt(grid.gridY, 10)}/forecast?units=us`);
    const data = res.json().then((res) => {
      console.log(res);
      setWeatherData(res);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let long = 0;
    let lat = 0;
    let a = 0;

    const firstRes = await fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}&query=${searchTerm}`);
    const firstData = await firstRes.json().then((firstData) => {
      while (firstData.data[a].continent !== "North America") {
        a++;
      }
      long = firstData.data[a].longitude;
      lat = firstData.data[a].latitude;
      setLocationName(firstData.data[a].label);
    });

    const secondRes = await fetch(`https://api.weather.gov/points/${lat},${long}`);
    const secondData = await secondRes.json();
    // console.log(data);
    const office = secondData.properties.gridId;
    const gridX = secondData.properties.gridX;
    const gridY = secondData.properties.gridY;

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
      <button onClick={fetchGrid}>Grid</button>
      <button onClick={fetchWeatherForecast}>Weather</button>
      <p>{locationName}</p>
    </div>
  );
}

export default GeoApi;
