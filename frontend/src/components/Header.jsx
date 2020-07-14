import React, { useState, useContext, useEffect } from "react";
import logo from "../logo-universidad-nebrija.jpg";

import "./Styles.css";

const Header = () => {
    return (
        <div>
            <div className="Header">
                <div className="Logo">
                    <img className="Image"
                    src={logo} >
                    </img>
                </div>
                    <div className="Text">
                    <h1>Energy Calculator</h1>    
                </div>    
            </div>
            <div className="Line">
                <hr className="hr"></hr>
            </div>
        </div>  
    )
}
export {Header as default};