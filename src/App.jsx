import { useContext, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Highscore from "./Components/Highscore";
import rightTick from "../src/assets/icon-completed.svg";
import smashedIcon from "../src/assets/icon-new-pb.svg";
import Hero from "./Components/Hero";
import starImg1 from "../src/assets/pattern-star-1.svg";
import starImg2 from "../src/assets/pattern-star-2.svg";
import TypingContext from "./Components/Context/Context";

function App() {
  const {
    isTestCompleted,
    newHighScore,
    calculateWPM,
    calculateAccuracy,
    getCorrectChars,
    data,
    mode,
    highScore,
    paragraph,
    firstAttempt,
  } = useContext(TypingContext);

  return (
    <>
      <Navbar />
      {/* {isTestCompleted ? (
        firstAttempt ? (
          <Highscore
            starImg1={starImg1}
            starImg2={starImg2}
            img={rightTick}
            heading={"Baseline Established!"}
            paragraph={
              "You've set the bar. Now the real challenge begins—time to beat it."
            }
            btnName={"Beat This Score"}
            wpm={calculateWPM()}
            accuracy={calculateAccuracy(paragraph.text)}
            correctChar={getCorrectChars(paragraph.text)}
            count={paragraph.text.length}
          />
        ) : newHighScore ? (
          <Highscore
            img={smashedIcon}
            heading={"High Score Smashed!"}
            paragraph={"You're getting faster. That was incredible typing."}
            btnName={"Beat This Score"}
            wpm={calculateWPM()}
            accuracy={calculateAccuracy(paragraph.text)}
            correctChar={getCorrectChars(paragraph.text)}
            count={paragraph.text.length}
          />
        ) : (
          <Highscore
            starImg1={starImg1}
            starImg2={starImg2}
            img={rightTick}
            heading={"Task Complete!"}
            paragraph={"Solid run. Keep pushing to beat your high score."}
            btnName={"Go Again"}
            wpm={calculateWPM()}
            accuracy={calculateAccuracy(paragraph.text)}
            correctChar={getCorrectChars(paragraph.text)}
            count={paragraph.text.length}
          />
        )
      ) : (
        <Hero />
      )} */}

      <Highscore
            starImg1={starImg1}
            starImg2={starImg2}
            img={rightTick}
            heading={"Task Complete!"}
            paragraph={"Solid run. Keep pushing to beat your high score."}
            btnName={"Go Again"}
            wpm={calculateWPM()}
            accuracy={calculateAccuracy(paragraph.text)}
            correctChar={getCorrectChars(paragraph.text)}
            count={paragraph.text.length}></Highscore>
    </>
  );
}

export default App;
