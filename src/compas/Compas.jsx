import React, { useEffect, useState } from "react";
import "./compas.scss";
import arrow from "../compas/arrow.png";

const Compas = () => {
  const [alpha, setAlpha] = useState(null);
  useEffect(() => {
    const getOrientation = (e) => {
      setAlpha(e.alpha);
    };
    window.addEventListener("deviceorientation", getOrientation);
    return () => {
      window.removeEventListener("deviceorientation", getOrientation);
    };
  });

  return (
    <>
      <div id="compas">
        <div id="arrow" style={{ transform: `rotate(${alpha}deg)` }}>
          <img src={arrow} alt="" />
        </div>
        <div className="letter">N</div>
        <div className="letter">E</div>
        <div className="letter">W</div>
        <div className="letter">S</div>
      </div>
    </>
  );
};

export default Compas;
