import React, { useState, useContext, useEffect } from "react";
import AppContext from "../AppContext";

import "./Styles.css";

const Header = () => {
    return (
        <div className="Header">
            <h1>energy calculator</h1>
        </div>
    )
}
export {Header as default};