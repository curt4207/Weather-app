import Head from "next/head";
import style from "../styles/Home.module.css";

//Default location
const defaultEndpoint = `https://api.weather.gov/gridpoints/OKX/32,34/forecast?units=us`;

//Fetches weather data
export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();

  return {
    props: { data },
  };
}

//data prop contains all the weather forecast info
const Home = ({ data }) => {
  //Gets month name instead of number
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = new Date().getMonth();

  //Just console logs the weather forecast data
  const logWeatherData = () => {
    console.log(data);
  };

  return (
    <div>
      <Head>
        <title>Weather App</title>
      </Head>
      <h1 className={style.title}>Weather</h1>
      <button className={style.button} onClick={logWeatherData}>
        Log Data
      </button>
      <h2 className={style.smallHeading}>{monthNames[month]}</h2>
      <br />
      <ul className={style.grid}>
        <li className={style.card} key={data.properties.periods.startTime}>
          <p className={style.day}>
            {data.properties.periods[0].startTime[8]}
            {data.properties.periods[0].startTime[9]}
          </p>
          <p>{data.properties.periods[0].temperature}°F</p>
          <p>{data.properties.periods[0].name}</p>
        </li>
      </ul>
    </div>
  );
};

export default Home;
