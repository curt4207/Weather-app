
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";
// import styled from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";

const StyledCard = styled(Card)`
    margin: 1px;
    padding: 0.5rem;
    text-align: center;
    color: #f8f0f0;
    text-decoration: none;
    border: 3px solid #0078aa;
    border-radius: 2rem;
    transition: color 0.15s ease, border-color 0.15s ease;
    background: #3ab4f2;
    display: flex;
    position: relative;
    left: 5rem;
  
  :hover,
  :focus,
  :active {
    color: #0078aa;
    border-color: #0078aa;
    background-color: #f6f6f6;
    cursor: default;
  }
  `;

const StyledPicture =styled.picture`
border: 3px solid black;
  position: relative;
  left: 75px;
  top: -90px;`;
  

const CurrentWeather = ({ weatherNow }) => {
  const properties = weatherNow.properties;
  if (!properties) {
    return (
      <h1>
        {weatherNow.title}
        <br/>
        {weatherNow.detail}
        <br/>
        {weatherNow.status}
      </h1>
    );
  }

  const periods = properties.periods;
  const firstPeriod = periods[0];
  const iconImage = firstPeriod.icon;

  
  return (
    
    <StyledCard sx={{ minWidth: 345, maxWidth: "fit-content", alignItems: "center"}}> 
      <CardContent sx={{ flex:"auto"}}>
        <Typography key={periods.startTime}>
          {firstPeriod.name}
        </Typography>
        <Typography variant="subtitle1" sx={{fontSize: "4rem", position: "relative", right: "70px"}}>
          {firstPeriod.startTime[8]}
          {firstPeriod.startTime[9]}
        </Typography>
        <Typography>
          <StyledPicture>
          <Image src={iconImage} height="80rem" width="80rem" alt="weather icon"
          />
          </StyledPicture>
        </Typography>
        <Typography variant="h5">
          {firstPeriod.temperature}°{firstPeriod.temperatureUnit}
        </Typography>
        <Typography variant="subtitle2">
          <p>{firstPeriod.shortForecast}</p>
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default styled(CurrentWeather)`
`;
