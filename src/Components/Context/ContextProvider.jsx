import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TypingContext from "./Context";
import data from "../../Data.json";

function TypingContextProvider({ children }) {
  const [input, setInput] = useState("");
  const [time, setTime] = useState(60);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [mode, setMode] = useState("easy");
  const [option, setOption] = useState("timed");
  const [isStarted, setIsStarted] = useState(false);

  const [highScore, setHighScore] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  useEffect(() => {
    const savedScore = localStorage.getItem("highScore");

    if (savedScore) {
      setHighScore(Number(savedScore));
    }
  }, [isTestCompleted]);

  useEffect(() => {
    if (!isTimeRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimeRunning]);

  useEffect(() => {
    if (input.length === 1) {
      setIsTimeRunning(true);
    }
  }, [input]);

  function reset() {
    setInput("");
    setTime(60);
    setIsTimeRunning(false);
    setIsStarted(false);
  }

  return (
    <TypingContext.Provider
      value={{
        data,
        input,
        setInput,
        time,
        setTime,
        isTimeRunning,
        setIsTimeRunning,
        setMode,
        mode,
        option,
        setOption,
        reset,
        highScore,
        newHighScore,
        setIsTestCompleted,
        setNewHighScore,
        isTestCompleted,



      }}
    >
      {children}
    </TypingContext.Provider>
  );
}

export default TypingContextProvider;
