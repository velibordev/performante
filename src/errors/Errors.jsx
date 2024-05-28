import { useState, useEffect } from "react";

function Errors() {
  const error_array = [
    "WRONG FRONT TIRE ROTATION",
    "CHECK BACK TIRE PRESSURE",
    "CHECK FRONT TIRE PRESSURE",
    "FRONT SHIFTER MALFUNCTION",
    "BACK SHIFTER MALFUNCTION",
    "CHECK FRONT BRAKE PADS ⚠️",
    "CHECK BACK BRAKE PADS ⚠️",
    "BACK TIRE WOBBLING ⚠️",
    "CENTER FRONT BRAKE ⚠️",
    "CENTER BACK BRAKE ⚠️",
    "CHANGE BACK TIRE INNER TUBE FROM 29in to 26in",
  ];

  const [errordsp, setErrorDsp] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorDsp((prevErrorDsp) => (prevErrorDsp + 1) % error_array.length);
      console.log(errordsp);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [error_array.length]);

  return (
    <p id="errpr" style={{ color: "red", fontWeight: "bold" }}>
      {error_array[errordsp]}
    </p>
  );
}

export default Errors;
