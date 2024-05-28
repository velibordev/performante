import React, { useEffect, useState } from "react";
import "./wather.scss";
let api =
  "https://api.openweathermap.org/data/2.5/weather?q=Pale&appid=1c16abb972cefe2c4f0aafca11772a09";
const Weather = () => {
  const [temp, setTemp] = useState(null);
  const [wind, setWind] = useState(null);
  const [hum, setHum] = useState(null);
  const [pressure, setPressure] = useState(null);
  useEffect(() => {
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTemp("T: " + (data.main.temp - 273.15).toFixed(0) + " °C");
        setHum("H: " + data.main.humidity + " g/kg");
        setWind("W: " + data.wind.speed.toFixed(0) + " km/h");
        setPressure("P: " + data.main.pressure + "mb");
      });
  });
  return (
    <div id="weather">
      <p>{temp}</p>
      <p>{wind}</p>
      <p>{hum}</p>
      <p>{pressure}</p>
    </div>
  );
};

export default Weather;
