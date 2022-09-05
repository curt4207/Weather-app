import React from 'react'
import style from "../styles/Home.module.css";
import Image from 'next/image'
import { Card , CardContent, Typography} from '@mui/material';


function WeeklyForecast({ weeklyWeather }) {
  const properties = weeklyWeather.properties;
  const periods = properties.periods;
  const firstPeriod = periods[0];

  return (
    <Card sx={{maxWidth: "fit-content"}} >

      {periods.map((item, index) => {
        if(index == 0 || item.isDaytime === false) {
          return;
        }
        return (

          <div key={index}>
          
            {item.name}
          
          <Image
            src={item.icon}
            alt="icon"
            width="60rem"
            height="60rem"
          />
          <Typography>
            {item.temperature}{firstPeriod.temperatureUnit}
          </Typography>
        </div>
        );
      })
      }
    </Card>
  )
}

export default WeeklyForecast