import React from "react";
import "./Navbar.css";
import largeLogo from '../assets/logo-large.svg';
import tropy from '../assets/icon-personal-best.svg';


export default function Navbar(){
    return(
        <div className="navbar-container">
            <div><img src={largeLogo} alt="logosn" /></div>
            <div>
                <div className="navbar-right">
                    <img src={tropy} alt="" />
                    <span className="wpm-container">Personal best: <p className="wpm-box"><span>&nbsp;92</span> WPM</p></span>
                </div>

            </div>

            
        </div>
    )
}