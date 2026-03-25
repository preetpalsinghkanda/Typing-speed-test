import React, { useContext } from "react";
import "./Hero.css";
import TypingContext from "./Context/Context";
import restartIcon from "../assets/icon-restart.svg";
import { useState } from "react";

export default function Hero() {
  const {
    data,
    input,
    setInput,
    time,
    mode,
    setMode,
    setTime,
    setIsTimeRunning,
    setOption,
    option,
    isTimeRunning,
    reset,
  } = useContext(TypingContext);

  const calculateWPM = () => {
    const chars = input.length;
    const words = chars / 5;
    const timeSpent = (60 - time) / 60;

    if (timeSpent <= 0) return 0;

    return Math.round(words / timeSpent);
  };

  const calculateAccuracy = () => {
    const text = paragraph.text;
    let correct = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) {
        correct++;
      }
    }

    if (input.length === 0) return 0;

    return Math.round((correct / input.length) * 100);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const [randomNumber] = useState(Math.floor(Math.random() * 10));

  const paragraph = data?.[mode]?.[randomNumber];

  //return
  return (
    <div className="main-container">
      <div className="main-navbar">
        <div className="left-main-navbar">
          <div>
            <p>WPM:</p>
            <span>{calculateWPM()}</span>
          </div>
          <hr />
          <div>
            <p>Accuracy:</p>
            <span>
              <span>{calculateAccuracy()}</span>%
            </span>
          </div>
          {option !== "passage" && (
            <>
              <hr />
              <div>
                <p>Time:</p>
                <span>{formatTime(time)}</span>
              </div>
            </>
          )}
        </div>

        <div className="right-main-navbar">
          <div className="right-navbar-box">
            <p>Difficulty:</p>
            <div className="button-box">
              <button
                className={mode === "easy" ? "active-mode-btn" : ""}
                onClick={() => {
                  setMode("easy");
                  reset()
                 
                }}
              >
                Easy
              </button>
              <button
                className={mode === "medium" ? "active-mode-btn" : ""}
                onClick={() => {
                  setMode("medium");
                 reset()
                }}
              >
                Medium
              </button>
              <button
                className={mode === "hard" ? "active-mode-btn" : ""}
                onClick={() => {
                  setMode("hard");
                  reset()
                }}
              >
                Hard
              </button>
            </div>
          </div>
          <hr />
          <div className="right-navbar-box">
            <p>Mode:</p>
            <div className="button-box">
              <button
                className={option === "timed" ? "active-mode-btn" : ""}
                onClick={() => {
                  setOption("timed");
                  reset()
                }}
              >
                Timed(60s)
              </button>
              <button
                className={option === "passage" ? "active-mode-btn" : ""}
                onClick={() => {
                  setOption("passage");
                  reset()
                }}
              >
                Passage
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="hr" />

      {!isTimeRunning && (
        <div className="overlay">
          <button onClick={() => setIsTimeRunning(false)}>
            Start Typing Test
          </button>
          <p>Or click the text and start typing</p>
        </div>
      )}
      <p className={`para ${!isTimeRunning ? "blur" : ""}`}>
        {paragraph.text.split("").map((char, index) => {
          let color = "hsl(240, 3%, 46%)";

          if (index < input.length) {
            color =
              char === input[index]
                ? "hsl(140, 63%, 57%)"
                : "hsl(354, 63%, 57%)";
          }

          return (
            <span key={index} style={{ color }}>
              {char}
            </span>
          );
        })}
      </p>
      <input
        className="hidden-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <hr className="hr" />

      <button
        className="restart-btn "
        onClick={() => {
          reset()
        }}
      >
        Restart Test
        <img src={restartIcon} alt="restartIcon" className="icon-restart" />
      </button>
    </div>
  );
}
