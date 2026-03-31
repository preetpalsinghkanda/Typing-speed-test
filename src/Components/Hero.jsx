import React, { useContext, useEffect } from "react";
import "./Hero.css";
import TypingContext from "./Context/Context";
import restartIcon from "../assets/icon-restart.svg";
import { useState } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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
    openDropdown,
    setOpenDropdown,
    totalTyped,
    setFirstAttempt,

    reset,
  } = useContext(TypingContext);

  const inputRef = useRef(null);

  // calculate wpm

  function calculateWPM() {
    const correctChars = getCorrectChars(paragraph.text);
    if (correctChars === 0) return 0;

    const words = correctChars / 5;
    const timeSpent = (60 - time) / 60;

    if (timeSpent <= 0) return 0;
    return Math.round(words / timeSpent);
  }

  // finishtest

  function finishTest() {
    if (isTestCompleted) return;

    setIsTimeRunning(false);
    setIsTestCompleted(true);
    const currentWpm = calculateWPM();
    const currentAccuracy = calculateAccuracy();

    const savedHighScore = Number(localStorage.getItem("highScore")) || 0;

    if (savedHighScore === 0) {
      setHighScore(currentWpm);
      localStorage.setItem("highScore", currentWpm);
      setNewHighScore(false);
      setFirstAttempt(true);
    } else if (currentWpm > savedHighScore && currentAccuracy >= 50) {
      setHighScore(currentWpm);
      localStorage.setItem("highScore", currentWpm);
      setNewHighScore(true);
      setFirstAttempt(false);
    } else {
      setNewHighScore(false);
      setFirstAttempt(false);
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

            {/* option  */}

            <div className="dropdown">
              <div
                className="dropdown-btn"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "difficulty" ? null : "difficulty",
                  )
                }
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                <FontAwesomeIcon icon={faAngleDown} />
              </div>

              <div
                className={`dropdown-content ${
                  openDropdown === "difficulty" ? "show" : ""
                }`}
              >
                {["easy", "medium", "hard"].map((item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      checked={mode === item}
                      onChange={() => {
                        setMode(item);
                        reset();
                        setOpenDropdown(null);
                      }}
                    />
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <hr className="line" />
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

            <div className="dropdown">
              <div
                className="dropdown-btn"
                onClick={() =>
                  setOpenDropdown(openDropdown === "mode" ? null : "mode")
                }
              >
                {option === "timed" ? "Timed (60s)" : "Passage"}
                <FontAwesomeIcon icon={faAngleDown} />
              </div>

              <div
                className={`dropdown-content ${
                  openDropdown === "mode" ? "show" : ""
                }`}
              >
                <label>
                  <input
                    type="radio"
                    checked={option === "timed"}
                    onChange={() => {
                      setOption("timed");
                      reset();
                      setOpenDropdown(null);
                    }}
                  />
                  Timed (60s)
                </label>

                <label>
                  <input
                    type="radio"
                    checked={option === "passage"}
                    onChange={() => {
                      setOption("passage");
                      reset();
                      setOpenDropdown(null);
                    }}
                  />
                  Passage
                </label>
              </div>
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
