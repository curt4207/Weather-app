import React from "react";
import style from "../styles/Home.module.css";

function ListItem(props) {
  const { weatherData } = props;
  return (
    <li className={style.card} key={weatherData.periods.startTime}>
      <p className={style.day}>
        {weatherData.periods[0].startTime[8]}
        {weatherData.periods[0].startTime[9]}
      </p>
      <p>{weatherData.periods[0].temperature}°F</p>
      <p>{weatherData.periods[0].name}</p>
    </li>
  );
}

export default ListItem;
