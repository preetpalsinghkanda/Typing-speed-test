import { useContext, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Highscore from "./Components/Highscore";
import rightTick from "../src/assets/icon-completed.svg";
import smashedIcon from "../src/assets/icon-new-pb.svg";
import Hero from "./Components/Hero";
import TypingContext from "./Components/Context/Context";

function App() {
  const { isTestCompleted, newHighScore } = useContext(TypingContext);
  return (
    <>
      <Navbar />
      <Hero />
      {newHighScore && (
        <Highscore
          img={smashedIcon}
          heading={"High Score Smashed!"}
          paragraph={"You're getting faster. That was incredible typing."}
          btnName={"Beat This Score"}
          wpm={95}
          accuracy={100}
          correctChar={120}
          count={5}
        />
      )}
      {isTestCompleted && (
        <Highscore
          img={rightTick}
          heading={"Task Complete!"}
          paragraph={"Solid run. Keep pushing to beat your high score."}
          btnName={"Go Again"}
          wpm={85}
          accuracy={90}
          correctChar={120}
          count={5}
        />
      )}
    </>
  );
}

export default App;
