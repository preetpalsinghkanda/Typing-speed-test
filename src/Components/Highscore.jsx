import React from "react";
import "./Highscore.css";
import smashedIcon from '../assets/icon-new-pb.svg';
import restartIcon from '../assets/icon-restart.svg';
import patternConfettiIcon from '../assets/pattern-confetti.svg';
import rightTick from '../assets/icon-completed.svg';



export default function Highscore(props){
    return(
        <>
        <div className="highscore-container">
            
            <img src={props.img} alt="smashedIcon" className="smashedIcon"/>
            <div className="highscore-heading"><h2>{props.heading}</h2><p>{props.paragraph}</p></div>
            <div className="highscore-result">
                <div className="wpm">
                    <p>WPM:</p>
                    <span>{props.wpm}</span>
                </div>
                <div className="accuracy">
                    <p>Accuracy:</p>
                    <span><span>{props.accuracy}</span>%</span>
                </div>
                <div className="characters">
                    <p>Characters:</p>
                    <span><span className="correct-char">{props.correctChar}</span>/<span className="count">{props.count}</span></span>
                </div>
            </div>
            <button className="BeatThisScore-btn">{props.btnName}<img src={restartIcon} alt="restartIcon" className="restartIcon"/></button>
            
        </div>
        <img src={patternConfettiIcon} alt="patternConfettiIcon" className="patternConfettiIcon" />
</>
    )
}