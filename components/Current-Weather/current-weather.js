import style from "../../styles/Home.module.css";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";



const CurrentWeather = ({weatherForecast}) => {
const properties = weatherForecast.properties;
const periods = properties.periods;
const firstPeriod = periods[0];

  return (
    <Card sx={{maxWidth: "fit-content"}}>
      <CardContent className={style.card}>
        <Typography className={style.day} key={periods.startTime}>
        {firstPeriod.name}
        </Typography >
          <Typography variant="h1">
          {firstPeriod.startTime[8]}
          {firstPeriod.startTime[9]}
          </Typography>
        <Typography variant="h5">
          {firstPeriod.temperature}°{firstPeriod.temperatureUnit}
        </Typography>
        <Typography variant="h3">
        <p>{firstPeriod.shortForecast}</p>
        </Typography>
    </CardContent>
    </Card>
  );

};

export default CurrentWeather;