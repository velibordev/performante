import "./SCSS/main.scss";
import logo from "./images/logo.png";
import Time from "./time_section/Time";
import Speed from "./speed_section/Speed";
import Lean from "./lean_section/Lean";
import Errors from "./errors/Errors";
import Music from "./music/Music";
import Km from "./kilometres/Kilometres";
import Compas from "./compas/Compas";
import Weather from "./weather/Weather";
import Tasks from "./tasks/Tasks";
import Sessions from "./sessions/Sessions";
import { useState } from "react";

function App() {
  let beep_audio = new Audio("../src/sounds/beep.mp3");
  let gate_audio = new Audio("../src/sounds/sp.mp3");
  const [speed, setSpeed] = useState(null);

  function animate_rtr_animation() {
    let ready_to_race_window_animation = document.querySelectorAll(
      ".ready_to_race_window_animation h1"
    );
    for (let i = 0; i < ready_to_race_window_animation.length; i++) {
      setTimeout(() => {
        ready_to_race_window_animation[i].classList.add(
          "ready_to_race_window_animation_active"
        );
      }, i * 100);
    }
  }

  function remove_rtr_window() {
    let ready_to_race_window = document.querySelector(".ready_to_race_window");
    ready_to_race_window.style.display = "none";
  }

  function show_sp_window() {
    let left_gate = document.querySelector(".left_gate");
    let right_gate = document.querySelector(".right_gate");

    let salcano_performance_window = document.querySelector(
      ".salcano_performance_window"
    );
    salcano_performance_window.style.cssText += "display:flex !important;";
    left_gate.classList.add("left_gate_active");
    right_gate.classList.add("right_gate_active");
  }

  window.onload = () => {
    setTimeout(() => {
      beep_audio.play();
    }, 200);
    setTimeout(animate_rtr_animation, 400);
    setTimeout(remove_rtr_window, 900);
    setTimeout(show_sp_window, 900);
    setTimeout(() => {
      gate_audio.play();
    }, 900);
    setTimeout(() => {
      let left_gate = document.querySelector(".left_gate");
      let right_gate = document.querySelector(".right_gate");
      left_gate.style.cssText = "display:none !important;";
      right_gate.style.cssText = "display:none !important;";
    }, 1600);
    setTimeout(() => {
      let main_panel = document.querySelector(".main_panel");
      let salcano_performance_window = document.querySelector(
        ".salcano_performance_window"
      );
      salcano_performance_window.style.cssText = "display:none !important;";
      main_panel.style.cssText = "display:flex !important;";
    }, 1700);
  };

  return (
    <div className="software_window">
      <div className="ready_to_race_window">
        <h1>
          READY <br /> TO RACE ?
        </h1>
        <div className="ready_to_race_window_animation">
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
          <h1>&gt;</h1>
        </div>
      </div>
      <div className="salcano_performance_window">
        <div className="gate_animation">
          <div className="left_gate"></div>
          <div className="right_gate"></div>
        </div>
        <img src={logo} alt="" />
        <h1>
          NG<span>850</span> PERFORMANCE SOFTWARE
        </h1>
      </div>
      <div className="main_panel">
        <div className="upper_panel">
          <Sessions></Sessions>
          <Km speed={speed}></Km>
        </div>
        <div className="middle_pannel">
          <div id="speed">
            <Speed speed={speed} setSpeed={setSpeed}></Speed>
          </div>
          <h5>LEAN ANGLE</h5>
          <h5>WHEELIE ANGLE</h5>
          <Lean></Lean>
          <Compas></Compas>
          <Weather></Weather>
        </div>

        <div className="bottom_pannel">
          <Errors></Errors>
          <Tasks></Tasks>
          <Music></Music>
          <button>SENSORS</button>
          <Time></Time>
        </div>
      </div>
    </div>
  );
}

export default App;
