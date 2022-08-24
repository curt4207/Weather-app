import React from 'react'
import style from "../styles/Home.module.css";
import Image from 'next/image'

function WeeklyForecast({ weeklyWeather }) {
  const properties = weeklyWeather.properties;
  const periods = properties.periods;

  console.log(periods)

  return (
    <div className={style.grid}>
      {periods.map((item, index) => {
        if(item.isDaytime === false) {
          return;
        }
        return (
          <div className={style.card} key={index}>
          <h3>
            {item.name}
          </h3>
          <Image
            src={item.icon}
            alt="icon"
            width="100"
            height="100"
          />
          <p>
            <span>{item.temperature}°F</span>
            <span> | {item.temperature}°F</span>
            {/*<span> | {item.temperature}°F</span> Should be a night temperature.*/}
          </p>
        </div>
        );
      })
      }
    </div>
  )
}

export default WeeklyForecast