import React, { useContext } from "react";
import "./Highscore.css";
import smashedIcon from "../assets/icon-new-pb.svg";
import restartIcon from "../assets/icon-restart.svg";
import patternConfettiIcon from "../assets/pattern-confetti.svg";
import rightTick from "../assets/icon-completed.svg";
import TypingContext from "./Context/Context";
import starImg1 from "../assets/pattern-star-1.svg";
import starImg2 from "../assets/pattern-star-2.svg";

export default function Highscore(props) {
  const { reset, firstAttempt, newHighScore } = useContext(TypingContext);
  return (
    <>
      <div className="highscore-container">
        <img
          src={props.img}
          alt="smashedIcon"
          className={!newHighScore ? "icon-new-pb" : "smashedIcon"}
        />
        <div className="highscore-heading">
          <h2>{props.heading}</h2>
          <p>{props.paragraph}</p>
        </div>
        <div className="highscore-result">
          <div className="wpm">
            <p>WPM:</p>
            <span>{props.wpm}</span>
          </div>
          <div className="accuracy">
            <p>Accuracy:</p>
            <span>
              <span>{props.accuracy}</span>%
            </span>
          </div>
          <div className="characters">
            <p>Characters:</p>
            <span>
              <span className="correct-char">{props.correctChar}</span>/
              <span className="count">{props.count}</span>
            </span>
          </div>
        </div>
        <button onClick={() => reset()} className="BeatThisScore-btn">
          {props.btnName}
          <img src={restartIcon} alt="restartIcon" className="restartIcon" />
        </button>
        {!newHighScore && (
          <>
            <img src={props.starImg1} className="star-img1" alt="star-img" />
            <img src={props.starImg2} className="star-img2" alt="star-img-2" />
          </>
        )}
      </div>
      {firstAttempt && (
        <img
          src={patternConfettiIcon}
          alt="patternConfettiIcon"
          className="patternConfettiIcon"
        />
      )}
    </>
  );
}
