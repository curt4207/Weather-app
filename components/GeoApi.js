import React, { useEffect, useState } from "react";
import style from "../styles/Home.module.css";
import fire from "../config/fire-conf";

function GeoApi(props) {
  const { setWeatherForecast, setWeatherNow, userData } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [locationName, setLocationName] = useState("Linn, Kansas");
  const [locationsGrids, setLocationsGrids] = useState([]);
  const [currentLocationGrid, setCurrentLocationGrid] = useState({ office: "TOP", gridX: 31, gridY: 80 });
  const API_KEY = process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY;

  useEffect(() => {
    if (userData) {
      fire
        .firestore()
        .collection(userData.additionalUserInfo.profile.id)
        .get()
        .then((res) => {
          res.docs.forEach((item) => {
            console.log(item.id, item.data());
            if (locationsGrids.length < item.length) {
              setLocationsGrids((array) => [...array, { id: item.id, grid: item.data() }]);
            }
          });
        });
    }
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  async function fetchCoords() {
    if (API_KEY === null) {
      console.log("Geolocation API key not set.");
    }
    const firstRes = await fetch(`http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${searchTerm}`);
    const firstData = await firstRes.json();
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
    console.log(office, gridX, gridY);

    return { office, gridX, gridY };
  }

  async function fetchWeatherData(office, gridX, gridY) {
    setCurrentLocationGrid({ office: office, gridX: gridX, gridY: gridY });

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

  const saveLocation = () => {
    //userData.additionalUserInfo.profile.id
    if (userData) {
      console.log(currentLocationGrid);
      fire.firestore().collection(userData.additionalUserInfo.profile.id).doc(locationName).set(currentLocationGrid);
    } else {
      alert("User must be signed in to save location");
    }
  };

  const listSavedLocations = () => {
    console.log(locationsGrids);
  };

  return (
    <div className={style.geo}>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <button onClick={fetchCoords}>Coordinates</button>
      <p>{locationName}</p>
      <button onClick={saveLocation}>Save Location</button>
      <button onClick={listSavedLocations}>List Saved Locations</button>
      <br />
    </div>
  );
}

export default GeoApi;
