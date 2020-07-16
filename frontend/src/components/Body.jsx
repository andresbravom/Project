import React, { useState, useContext, useEffect } from "react";
import AppContext from "../AppContext";

import "./Styles.css";

const Body = () => {
  const context = useContext(AppContext);
  return (
    <div className="Body">
      <div className="Title">Options</div>
      <hr className="hrBar"></hr>
      <div className="Button" onClick={() => context.button.set(2)}>
        Add Route
      </div>
      <div className="Button" onClick={() => context.button.set(3)}>
        Search Route
      </div>
    </div>
  );
};
export { Body as default };
