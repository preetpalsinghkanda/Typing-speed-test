import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="main-container">
      <div className="main-navbar">
        <div className="left-main-navbar">
          <div>
            <p>WPM:</p>
            <span>40</span>
          </div>
          <hr />
          <div>
            <p>Accuracy:</p>
            <span>
              <span>94</span>%
            </span>
          </div>
          <hr />
          <div>
            <p>Time:</p>
            <span>0:46</span>
          </div>
        </div>

        <div className="right-main-navbar">
          <div className="right-navbar-box">
            <p>Difficulty:</p>
            <div className="button-box">
              <button>Easy</button>
              <button>Medium</button>
              <button>Hard</button>
            </div>
          </div>
          <hr />
          <div className="right-navbar-box">
            <p>Mode:</p>
            <div className="button-box">
              <button>Timed(60s)</button>
              <button>Passage</button>
            </div>
          </div>
        </div>
      </div>

      <hr className="hr" />
    </div>
  );
}
