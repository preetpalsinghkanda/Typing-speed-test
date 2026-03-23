import React from "react";
import "./Highscore.css";
import smashedIcon from '../assets/icon-new-pb.svg';
import restartIcon from '../assets/icon-restart.svg';
import patternConfettiIcon from '../assets/pattern-confetti.svg';



export default function Highscore(){
    return(
        <>
        <div className="highscore-container">
            
            <img src={smashedIcon} alt="smashedIcon" className="smashedIcon"/>
            <div className="highscore-heading"><h2>High Score Smashed!</h2><p>You're getting faster. That was incredible typing.</p></div>
            <div className="highscore-result">
                <div className="wpm">
                    <p>WPM:</p>
                    <span>95</span>
                </div>
                <div className="accuracy">
                    <p>Accuracy:</p>
                    <span><span>100</span>%</span>
                </div>
                <div className="characters">
                    <p>Characters:</p>
                    <span><span className="correct-char">120</span>/<span className="count">5</span></span>
                </div>
            </div>
            <button className="BeatThisScore-btn">Beat This Score <img src={restartIcon} alt="restartIcon" className="restartIcon"/></button>
            
        </div>
        <img src={patternConfettiIcon} alt="patternConfettiIcon" className="patternConfettiIcon" />
</>
    )
}