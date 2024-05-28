import "./sessions.scss";
const api = "https://65d1d85e987977636bfb8afa.mockapi.io/SESSIONS";
import { useState } from "react";
const Sessions = () => {
  const [isOpen, setIsOpen] = useState(false);
  function fetchSessions() {
    setIsOpen(true);
    if (isOpen) {
      let session_div = document.querySelector(".session_div");
      session_div.style.cssText = "display :block !important;";
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.forEach((element) => {
            let p = document.createElement("p");
            let span_1 = document.createElement("span");
            let span_2 = document.createElement("span");
            let span_3 = document.createElement("span");
            let span_4 = document.createElement("span");
            let span_5 = document.createElement("span");

            span_1.innerText = `Name: ${element.name}`;
            span_2.innerText = `Date: ${element.date}`;
            span_3.innerText = `Mileage: ${element.km} km`;
            span_4.innerText = `Description: ${element.desc}`;
            span_5.innerText = `Duration: ${element.len.toFixed(0)} minute/s`;
            p.appendChild(span_1);
            p.appendChild(span_2);
            p.appendChild(span_3);
            p.appendChild(span_4);
            p.appendChild(span_5);
            session_div.appendChild(p);
          });
        });
    }
  }
  return (
    <>
      <button id="sessions" onClick={fetchSessions}>
        SESSIONS
      </button>
      <div className="session_div"></div>
    </>
  );
};

export default Sessions;
