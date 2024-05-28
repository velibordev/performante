import React, { useState, useEffect } from "react";

function Speed({ speed, setSpeed }) {
  const [charge, setCharge] = useState(0);
  const [prevSpeed, setPrevSpeed] = useState(0);

  let beep = new Audio("../src/sounds/rapid_beep.mp3");

  useEffect(() => {
    const watchID = navigator.geolocation.watchPosition(
      (position) => {
        const currentSpeed = position.coords.speed;
        setSpeed(currentSpeed);
      },
      (error) => console.error(error),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchID);
    };
  }, [setSpeed]);

  useEffect(() => {
    let intervalId;

    if (speed * 3.6 > 35) {
      intervalId = setInterval(() => {
        beep.play();
      }, 200);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [speed]);

  useEffect(() => {
    let intervalId;

    if (speed * 3.6 > 0) {
      intervalId = setInterval(() => {
        setCharge((charge) => (charge = speed * 3.6));

        if (prevSpeed > 10 && speed * 3.6 < 10) {
          let aside = document.querySelectorAll(".aside");
          aside[4].style.backgroundColor = "cyan";
          aside[3].style.backgroundColor = "cyan";
          aside[2].style.backgroundColor = "cyan";
          aside[1].style.backgroundColor = "cyan";
          aside[0].style.backgroundColor = "cyan";
        } else if (prevSpeed > 25 && speed * 3.6 < 15) {
          let aside = document.querySelectorAll(".aside");
          aside[3].style.backgroundColor = "red";
          aside[2].style.backgroundColor = "cyan";
          aside[1].style.backgroundColor = "cyan";
          aside[0].style.backgroundColor = "cyan";
        } else if (prevSpeed > 30 && speed * 3.6 < 15) {
          let aside = document.querySelectorAll(".aside");
          aside[2].style.backgroundColor = "red";
          aside[1].style.backgroundColor = "cyan";
          aside[0].style.backgroundColor = "cyan";
        } else if (prevSpeed > 35 && speed * 3.6 < 15) {
          let aside = document.querySelectorAll(".aside");
          aside[1].style.backgroundColor = "red";
          aside[0].style.backgroundColor = "cyan";
        } else if (prevSpeed > 40 && speed * 3.6 < 15) {
          let aside = document.querySelectorAll(".aside");
          aside[0].style.backgroundColor = "red";
        } else {
          setTimeout(() => {
            let aside = document.querySelectorAll(".aside");
            aside.forEach((el) => {
              el.style.backgroundColor = "rgb(26, 25, 23)";
            });
          }, 3000);
        }
        setPrevSpeed(speed * 3.6);
      }, 200);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [speed, charge, prevSpeed]);

  return (
    <>
      <h1>
        {speed !== null ? (
          <>
            {Math.round(speed * 3.6)}
            <span>km/h</span>
          </>
        ) : (
          "CSP"
        )}
      </h1>

      <div
        className="rpm_pannel"
        style={{
          background: `linear-gradient(to right, cyan 0%, cyan ${Math.round(
            ((speed * 3.6 * 8.1 * 40) / 400) * 2
          )}%, rgb(26, 25, 23) ${Math.round(
            ((speed * 3.6 * 8.1 * 40) / 400) * 2
          )}%, rgb(26, 25, 23) 100%)`,
        }}
      >
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
      </div>
      {speed !== null && speed * 3.6 > 35 && (
        <div className="speed_alert">
          <h1>!</h1>
        </div>
      )}
      {speed !== null && speed * 3.6 > 55 && (
        <div className="illegal_speed">
          <h1>
            {(speed * 3.6).toFixed(0)}

            <p id="jg">Slow Down Or... Jackston Goldstone, RedBull Hardline.</p>
          </h1>
        </div>
      )}
      <p id="bc_text">BRAKE</p>
      <div className="charge">
        <section className="aside"></section>
        <section className="aside"></section>
        <section className="aside"></section>
        <section className="aside"></section>
        <section className="aside"></section>
      </div>
    </>
  );
}

export default Speed;
