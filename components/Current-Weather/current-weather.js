import style from "../../styles/Home.module.css";

const CurrentWeather = ({ weatherNow }) => {
  const properties = weatherNow.properties;
  const periods = properties.periods;
  const firstPeriod = periods[0];

  return (
    <ul className={style.grid}>
      <li className={style.card} key={periods.startTime}>
        <p className={style.day}>
          {firstPeriod.startTime[8]}
          {firstPeriod.startTime[9]}
        </p>
        <p>
          {firstPeriod.temperature}°{firstPeriod.temperatureUnit}
        </p>
        <p>{firstPeriod.name}</p>
      </li>
    </ul>
  );
};

export default CurrentWeather;
