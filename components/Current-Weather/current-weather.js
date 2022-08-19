import { useEffect, useState } from "react";
import style from "../../styles/Home.module.css";

const CurrentWeather = ({weatherData}) => {
const [currentWeather, setCurrentWeather] = useState("");


const properties = weatherData.properties;
const periods = properties.periods;
const firstPeriod = periods[0];
// i want it to show the current weather for my location, the temp, if its sunny or partly cloudy, and maybe the high and low for the day
return (
    <ul className={style.grid}>
        <li className={style.card} key={periods.startTime}>
          <p className={style.day}>
            {firstPeriod.startTime[8]}
            {firstPeriod.startTime[9]}
          </p>
          <p>{firstPeriod.temperature}°{firstPeriod.temperatureUnit}</p>
          <p>{firstPeriod.name}</p>
          
        </li>
      </ul> 
)
};

export default CurrentWeather;