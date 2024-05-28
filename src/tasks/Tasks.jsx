import React, { useEffect, useState } from "react";
import "./tasks.scss";
import taskim from "./task.png";

const data_api = "https://65d1d85e987977636bfb8afa.mockapi.io/TASKS";

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };
  const add = () => {
    fetch(data_api, {
      method: "POST",
      body: JSON.stringify({
        content: input,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const task_window = document.getElementById("task_window");

    const p = document.createElement("p");
    p.innerText = input;
    task_window.appendChild(p);
    setInput("");
  };
  useEffect(() => {
    const task_window = document.getElementById("task_window");

    if (isOpen) {
      task_window.style.display = "flex";

      fetch(data_api)
        .then((response) => response.json())
        .then((data) => {
          // Clear previous tasks

          data.forEach((element) => {
            let p = document.createElement("p");
            let delete_button = document.createElement("button");
            p.innerText = element.content;
            delete_button.innerText = "X";
            delete_button.addEventListener("click", (e) => {
              e.preventDefault();
              var xhr = new XMLHttpRequest();
              xhr.open(
                "DELETE",
                `https://65d1d85e987977636bfb8afa.mockapi.io/TASKS/${element.id}`
              );
              xhr.send();
              p.style.display = "none";
            });
            task_window.appendChild(p);
            p.appendChild(delete_button);
          });
          // Re-attach the close button event listener
          document
            .getElementById("close_task_window")
            .addEventListener("click", close);
        });
    } else {
      task_window.style.cssText = "display:none !important";
    }
  }, [isOpen]);

  return (
    <>
      <button
        id="tasks"
        onClick={open}
        style={{ minWidth: "80px", display: "block" }}
      >
        <img src={taskim} alt="" width="25px" />
      </button>
      <div
        id="task_window"
        style={{ display: "none", flexDirection: "column" }}
      >
        <button id="close_task_window" onClick={close}>
          X
        </button>
        <div className="i_b_wrapper">
          <input
            type="text"
            placeholder="Task"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button onClick={add}>+</button>
        </div>
      </div>
    </>
  );
};

export default Tasks;
