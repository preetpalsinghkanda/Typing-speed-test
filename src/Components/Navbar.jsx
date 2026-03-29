import React, { useContext } from "react";
import "./Navbar.css";
import largeLogo from '../assets/logo-large.svg';
import tropy from '../assets/icon-personal-best.svg';
import TypingContext from "./Context/Context";
import smallLogo from '../assets/logo-small.svg'


export default function Navbar(){
    const isMobile = window.innerWidth < 768;
    const{highScore} = useContext(TypingContext)
    return(
        <div className="navbar-container">
            <div><img src={largeLogo} alt="logo-large" className="large-logo" /><img src={smallLogo} alt="logo-small" className="small-logo" /></div>
            <div>
                <div className="navbar-right">
                    <img src={tropy} alt="" />
                    <span className="wpm-container"><span className="personal-word">Personal&nbsp;</span> best: <p className="wpm-box"><span>&nbsp;{highScore}</span> WPM</p></span>
                </div>

            </div>

            
        </div>
    )
}