import React, { useState } from "react";

function PastWeather() {
  const [monthlyDisplay, setMonthlyDisplay] = useState(false);
  const showMonthlyWeather = () => {
    if (!monthlyDisplay) {
      setMonthlyDisplay(true);
      console.log(monthlyDisplay);
    } else {
      console.log(monthlyDisplay);
      setMonthlyDisplay(false);
    }
  };

  return (
    <div>
      <button onClick={showMonthlyWeather}>Monthly</button>
      {monthlyDisplay && <h1>Monthly Weather Data</h1>}
    </div>
  );
}

export default PastWeather;
