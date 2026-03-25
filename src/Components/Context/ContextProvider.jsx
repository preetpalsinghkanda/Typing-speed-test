import React, { use } from "react";
import { useState } from "react";
import { useEffect } from "react";
import TypingContext from "./Context";
import data from "../../Data.json";

function TypingContextProvider({ children }) {
  const [input, setInput] = useState("");
const [time, setTime] = useState(60);
const [isTimeRunning, setIsTimeRunning] = useState(false)
const [mode , setMode] = useState("easy")

  useEffect(() => {
  let interval;

  if (isTimeRunning && time > 0) {
    interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  }

  return () => clearInterval(interval);
}, [isTimeRunning, time]);

  useEffect(() => {
  if (input.length === 1) {
    setIsTimeRunning(true);
  }
}, [input]);





  return (
    <TypingContext.Provider   value={{ data, input, setInput, time, setTime, isTimeRunning, setIsTimeRunning , setMode , mode}}>
      {children}
    </TypingContext.Provider>
  );
}

export default TypingContextProvider;
