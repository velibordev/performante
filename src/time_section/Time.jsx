import React, { useState, useEffect } from "react";
import "./time.scss";

function Time() {
  const [time, setTime] = useState(new Date());
  const [blinker, setBlinker] = useState(false);
  const blinker_sound = new Audio("../src/time_section/blinker.mp3");
  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalID);
  }, []); // Empty dependency array ensures that effect runs only once after initial render

  const hour = time.getHours();
  const minutes = time.getMinutes();

  // Define activeBlinker outside useEffect so it can be referenced in JSX
  const inactiveBlinker = () => {
    setBlinker(false);
    blinker_sound.pause();
    let blinker_div = document.querySelector(".blinker_div");
    blinker_div.style.display = "none";
  };
  const activeBlinker = () => {
    setBlinker(true);
    if (blinker) {
      let blinker_div = document.querySelector(".blinker_div");
      blinker_div.style.display = "flex";
      blinker_sound.play();
      blinker_div.addEventListener("click", inactiveBlinker);
    } else {
      blinker_sound.pause();
    }
  };

  return (
    <>
      <h1 className="time" onClick={activeBlinker}>{`${hour}:${
        minutes < 10 ? "0" : ""
      }${minutes}`}</h1>
      <div className="blinker_div">
        <div className="blue"></div>
        <div className="red"></div>
      </div>
    </>
  );
}

export default Time;
