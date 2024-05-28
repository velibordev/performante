import { useState, useEffect, useRef } from "react";
import "./music.scss";

function Music() {
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(null);

  const arab_nokia = useRef(new Audio("../src/music/playlist/arab_nokia.mp3"));
  const a_ona_to_zna = useRef(
    new Audio("../src/music/playlist/a_ona_to_zna.mp3")
  );
  const mirises_na_nju = useRef(
    new Audio("../src/music/playlist/mirises_na_nju.mp3")
  );
  const smack_that = useRef(new Audio("../src/music/playlist/smack_that.mp3"));
  const living_life_in_the_night = useRef(
    new Audio("../src/music/playlist/living_life_in_the_night.mp3")
  );

  const frka_u_zljebovima = useRef(
    new Audio("../src/music/playlist/frka_u_zljebovima.mp3")
  );
  const jebem_li_ti_kolje = useRef(
    new Audio("../src/music/playlist/jebem_li_ti_kolje.mp3")
  );

  const musicArray = [
    arab_nokia,
    frka_u_zljebovima,
    jebem_li_ti_kolje,
    a_ona_to_zna,
    mirises_na_nju,
    smack_that,
    living_life_in_the_night,
  ];

  const musicName = [
    "arab_nokia",
    "frka_u_zljebovima",
    "jebem_li_ti_kolje",
    "a_ona_to_zna",
    "mirises_na_nju",
    "smack_that",
    "living_life_in_the_night",
  ];

  const handleButtonClick = () => {
    setIsMusicOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMusicOpen) {
      document.body.style.overflow = "hidden";
      let music_number = document.getElementById("music_number");
      music_number.innerText = `Songs: ${musicArray.length}`;
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMusicOpen]);

  const handlePlayClick = (audio) => {
    if (playingAudio && playingAudio !== audio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
    audio.play();
    setPlayingAudio(audio);
  };

  const handleStopClick = (audio) => {
    audio.pause();
    audio.currentTime = 0;
    if (playingAudio === audio) {
      setPlayingAudio(null);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} id="music_btn">
        MUSIC
      </button>
      {isMusicOpen && (
        <div id="opened_music">
          <button onClick={handleButtonClick} id="close_music">
            Close
          </button>
          <p id="music_number"></p>
          {musicArray.map((audio, index) => (
            <section key={index} className="music_wrapper">
              <button onClick={() => handlePlayClick(audio.current)}>
                {musicName[index]}
              </button>
              <button onClick={() => handleStopClick(audio.current)}>
                STOP
              </button>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default Music;
