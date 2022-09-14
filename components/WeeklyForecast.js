import React from 'react'
// import style from "../styles/Home.module.css";
import Image from 'next/image';
import { Box, Card , CardContent, Typography} from '@mui/material';
import styled from 'styled-components';

const StyledDiv = styled.div`
`;

function WeeklyForecast({ weeklyWeather }) {
  const properties = weeklyWeather.properties;
  const periods = properties.periods;
  const firstPeriod = periods[0];

  return (
    <Box sx={{ display: "flex"}}>
      {periods.map((item, index) => {
        if(index == 0 || item.isDaytime === false) {
          return;
        }
        return (
          <div key={index}>
          <Card sx={{Width: "fit-content", backgroundColor: "#F2A057", border: "1px solid #034C8C",margin: "1rem",
          "&:hover": {
            backgroundColor: "#034C8C",
            color: "#F2E205",
            scale: "1.2"
          }}} >
            <CardContent >
          <Typography fontSize={15}>
            {item.name}
            </Typography>
          <Image
            src={item.icon}
            alt="icon"
            width="50rem"
            height="50rem"
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
    </Box>
  )
}

export default WeeklyForecast