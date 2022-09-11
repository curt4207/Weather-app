import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fire from "../config/fire-conf";

function GeoApi(props) {
  const { setWeatherForecast, setWeatherNow, userData, signInStatus, setLongLat } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [locationName, setLocationName] = useState("Linn, Kansas");
  const [locationsGrids, setLocationsGrids] = useState([{ id: "Linn, Kansas", office: "TOP", gridX: 31, gridY: 80 }]);
  const [currentLocationGrid, setCurrentLocationGrid] = useState({ office: "TOP", gridX: 31, gridY: 80 });
  const API_KEY = process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY;

  const fetchSavedLocations = () => {
    setLocationsGrids([]);
    fire
      .firestore()
      .collection(userData.additionalUserInfo.profile.id)
      .get()
      .then((res) => {
        setLocationsGrids([]);
        res.docs.forEach((item) => {
          if (!locationsGrids.includes(item)) {
            setLocationsGrids((array) => [...array, { id: item.id, grid: item.data() }]);
          }
        });
      });
  };

  useEffect(() => {
    if (signInStatus) {
      fetchSavedLocations();
    }
  }, [signInStatus]);

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
    setLongLat([long, lat]);

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

  async function fetchSavedLocation(office, gridX, gridY, location) {
    setCurrentLocationGrid({ office: office, gridX: gridX, gridY: gridY });
    setLocationName(location);

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
    if (searchTerm.trim() === "") {
      return;
    }
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
      fire.firestore().collection(userData.additionalUserInfo.profile.id).doc(locationName).set(currentLocationGrid);
      fetchSavedLocations();
    } else {
      alert("User must be signed in to save location");
    }
  };

  const removeLocation = (location) => {
    fire.firestore().collection(userData.additionalUserInfo.profile.id).doc(location).delete();
    const newList = locationsGrids.filter((item) => item.id !== location);
    setLocationsGrids(newList);
    console.log(newList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <p>{locationName}</p>
      <button onClick={saveLocation}>Save Location</button>
      <br />
      <ul>
        {signInStatus &&
          locationsGrids.map((item) => {
            return (
              <li key={item.id}>
                <button onClick={() => fetchSavedLocation(item.grid.office, item.grid.gridX, item.grid.gridY, item.id)}>{item.id}</button>
                <button onClick={() => removeLocation(item.id)}>X</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default styled(GeoApi)``;
