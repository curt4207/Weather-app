import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";
// import styled from "@mui/material";
import CardContainer from "../CardContainer";

const StyledCard = styled(Card)`
  margin: 1rem;
  padding: 0.5rem;
  text-align: center;
  color: #f8f0f0;
  text-decoration: none;
  border: 3px solid #0078aa;
  border-radius: 2rem;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: fit-content;
  list-style: none;
  background: #3ab4f2;
  display: flex;

  :hover,
  :focus,
  :active {
    color: #0078aa;
    border-color: #0078aa;
    background-color: #f6f6f6;
    cursor: default;
  }
`;
const StyledCardContainer = styled(CardContainer)`
  top: 5px;
  box-sizing: border-box;
`;
// const H1 = styled.h1`
// font-size: "50rem"`

const CurrentWeather = ({ weatherNow }) => {
  const properties = weatherNow.properties;
  const periods = properties.periods;
  const firstPeriod = periods[0];
  const iconImage = firstPeriod.icon;

  return (
    <StyledCard sx={{ maxWidth: "fit-content" }}>
      <CardContent>
        {/* I think we don't need this since firstPeriod.name is an empty string */}
        {/* <Typography key={periods.startTime}>
          {firstPeriod.name}
        </Typography> */}
        <Typography variant="h3">
          {firstPeriod.startTime[8]}
          {firstPeriod.startTime[9]}
        </Typography>
        <Typography>
          <picture>
            <img src={iconImage} height="60rem" width="60rem" alt="weather icon" />
          </picture>
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

export default styled(CurrentWeather)``;
