import React, { useContext, useEffect } from "react";
import "./Hero.css";
import TypingContext from "./Context/Context";
import restartIcon from "../assets/icon-restart.svg";
import { useState } from "react";
import { useRef } from "react";

export default function Hero() {
  const {
    setHighScore,
    data,
    input,
    setInput,
    time,
    mode,
    isTestCompleted,
    setMode,
    setTime,
    setIsTimeRunning,
    setOption,
    option,
    isTimeRunning,
    highScore,
    setNewHighScore,
    setIsTestCompleted,
    paragraph,
    getCorrectChars,
    totalTyped,
    setFirstAttempt ,
    

    reset,
  } = useContext(TypingContext);

  const inputRef = useRef(null);

  // calculate wpm

  function calculateWPM() {
    if (input.length === 0) return 0;

    const words = input.length / 5;
    const timeElapsedInSeconds = 60 - time;

    if (timeElapsedInSeconds < 1) return 0;

    const timeSpentInMinutes = timeElapsedInSeconds / 60;

    return Math.round(words / timeSpentInMinutes);
  }

  // finish test fnc
function finishTest() {
  if (isTestCompleted) return;

  setIsTimeRunning(false);
  setIsTestCompleted(true);

  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();

  const prevHighScore = highScore; 

  if (prevHighScore === 0) {
    setHighScore(wpm);
    localStorage.setItem("highScore", wpm);
    setNewHighScore("baseline"); 
    setFirstAttempt(false);
  } 
  else if (wpm > prevHighScore && accuracy >= 50) {
    setHighScore(wpm);
    localStorage.setItem("highScore", wpm);
    setNewHighScore(true);
  } 
  else {
    setNewHighScore(false);
  }
}

  useEffect(() => {
    if (option === "timed" && time === 0) {
      finishTest();
    }
  }, [time, option]);

  useEffect(() => {
    if (!paragraph?.text) return;

    if (input.length >= paragraph.text.length) {
      finishTest();
    }
  }, [input]);

  //calculate  Accuracy
  function calculateAccuracy() {
    if (input.length === 0) return 0;

    const correct = getCorrectChars(paragraph.text);

    return Math.round((correct / input.length) * 100);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

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
                  reset();
                }}
              >
                Easy
              </button>
              <button
                className={mode === "medium" ? "active-mode-btn" : ""}
                onClick={() => {
                  setMode("medium");
                  reset();
                }}
              >
                Medium
              </button>
              <button
                className={mode === "hard" ? "active-mode-btn" : ""}
                onClick={() => {
                  setMode("hard");
                  reset();
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
                  reset();
                }}
              >
                Timed(60s)
              </button>
              <button
                className={option === "passage" ? "active-mode-btn" : ""}
                onClick={() => {
                  setOption("passage");
                  reset();
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
          <button
            onClick={() => {
              setIsTimeRunning(true);
              inputRef.current.focus();
            }}
          >
            Start Typing Test
          </button>
          <p>Or click the text and start typing</p>
        </div>
      )}

      <p className={`para ${!isTimeRunning ? "blur" : ""}`}>
        {paragraph.text.split("").map((char, index) => {
          let color = "hsl(240, 3%, 46%)";
          let textDecoration = "none";
          let className = "";

          if (index < input.length) {
            if (char === input[index]) {
              color = "hsl(140, 63%, 57%)";
            } else {
              color = "hsl(354, 63%, 57%)";
              textDecoration = "underline";
            }
          }

          if (index === input.length) {
            className = "cursor-box";
          }

          return (
            <span
              key={index}
              className={className}
              style={{ color, textDecoration, display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </p>

      <input
        ref={inputRef}
        className="hidden-input"
        value={input}
        onChange={(e) => {
          const value = e.target.value;

          const isDeletion = value.length < input.length;

          if (isDeletion) {
            setInput(value);
            return;
          }
          const lastChar = value[value.length - 1];
          const expectedChar = paragraph.text[input.length];

          if (lastChar === " " && expectedChar !== " ") {
            return;
          }
          setInput(value);
        }}
        autoFocus
      />
      <hr className="hr" />

      <button
        className="restart-btn "
        onClick={() => {
          reset();
        }}
      >
        Restart Test
        <img src={restartIcon} alt="restartIcon" className="icon-restart" />
      </button>
    </div>
  );
}
