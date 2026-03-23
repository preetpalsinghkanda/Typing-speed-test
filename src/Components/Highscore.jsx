import React from "react";
import "./Highscore.css";
import smashedIcon from '../assets/icon-new-pb.svg';
import restartIcon from '../assets/icon-restart.svg';



export default function Highscore(){
    return(
        <div className="highscore-container">
            <div><img src={smashedIcon} alt="smashedIcon" /></div>
            <div><h2>High Score Smashed!</h2><p>You're getting faster. That was incredible typing.</p></div>
            <div className="highscore-result">
                <div>
                    <p>WPM:</p>
                    <span></span>
                </div>
                <div>
                    <p>Accuracy:</p>
                    <span></span>
                </div>
                <div>
                    <p>Characters</p>
                    <span></span>
                </div>
            </div>
            <button>Beat This Score <img src={restartIcon} alt="restartIcon" className="restartIcon"/></button>
        </div>

    )
}