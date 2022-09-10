import React from 'react'
// import style from "../styles/Home.module.css";
import Image from 'next/image'
import { Card , CardContent, Typography} from '@mui/material';
import styled from 'styled-components';

const StyledDiv = styled.div`
`;

function WeeklyForecast({ weeklyWeather }) {
  const properties = weeklyWeather.properties;
  const periods = properties.periods;
  const firstPeriod = periods[0];

  return (
    <div>

      {periods.map((item, index) => {
        if(index == 0 || item.isDaytime === false) {
          return;
        }
        return (
          <div key={index}>
          <Card sx={{maxWidth: "fit-content"}} >
            <CardContent >
          <Typography fontSize={15}>
            {item.name}
            </Typography>
          <Image
            src={item.icon}
            alt="icon"
            width="60rem"
            height="60rem"
          />
          <Typography >
            {item.temperature}{firstPeriod.temperatureUnit}
          </Typography>
          </CardContent>
          </Card>
        </div>
        
        );
      })
      }
    </div>
  )
}

export default WeeklyForecast