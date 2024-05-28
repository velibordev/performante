import React, { useState, useEffect } from "react";
const API = "https://65d1d85e987977636bfb8afa.mockapi.io/SESSIONS";

function Km({ speed }) {
  const [distance, setDistance] = useState(
    parseFloat(localStorage.getItem("distance")) || 0
  );
  const [sessionDistance, setSessionDistance] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [lenght, setLenght] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDistance((distance) => {
        const newDistance = distance + speed / 1000;
        localStorage.setItem("distance", newDistance);
        return newDistance;
      });
      if (sessionActive) {
        setSessionDistance((sessionDistance) => sessionDistance + speed / 1000);
        setLenght((lenght) => lenght + 1 / 60);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [speed, sessionActive]);

  const startSession = () => {
    setSessionActive(true);
    setSessionDistance(0);
    setLenght(0);
  };

  const stopSession = () => {
    setSessionActive(false);
  };
  const saveSession = () => {
    let name = prompt("Session name");
    let desc = prompt("Session description");
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    fetch(API, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        date: `${day}.${month}.${year}.`,
        km: sessionDistance,
        desc: desc,
        len: lenght,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setSessionActive(false);
  };
  return (
    <>
      <p>Total: {distance.toFixed(2)} km</p>
      <div className="session">
        {!sessionActive && (
          <button onClick={startSession}>START SESSION</button>
        )}
        {sessionActive && (
          <>
            <button onClick={stopSession}>STOP SESSION</button>
            <button onClick={saveSession}>SAVE SESSION</button>
            <p>{sessionDistance.toFixed(2)} km</p>
          </>
        )}
      </div>
    </>
  );
}

export default Km;
