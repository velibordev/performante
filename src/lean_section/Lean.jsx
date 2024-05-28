import React, { useState, useEffect } from "react";
import "./lean.scss";

function Lean() {
  const [beta, setBeta] = useState(null);
  const [gamma, setGamma] = useState(null);
  //   let sensor = new Audio("../src/sounds/lean_wheelie_sensor.mp3");
  useEffect(() => {
    const handleOrientationChange = (event) => {
      setBeta(event.beta);
      setGamma(event.gamma);
      if (
        event.beta > 30 ||
        event.beta < -30 ||
        event.gamma > 30 ||
        event.gamma < -30
      ) {
        document.querySelector(".lean").classList.add("rapid_red");
      } else {
        document.querySelector(".lean").classList.remove("rapid_red");
      }
    };

    window.addEventListener("deviceorientation", handleOrientationChange);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientationChange);
    };
  }, []); // empty dependency array means this effect runs only once after the initial render

  return (
    <div className="lean">
      {beta !== null && (
        <p style={{ marginLeft: `${beta.toFixed(0) * 2.5}px` }}></p>
      )}
      {gamma !== null && (
        <p style={{ marginTop: `${gamma.toFixed(0) * 2.5}px` }}></p>
      )}
    </div>
  );
}

export default Lean;
