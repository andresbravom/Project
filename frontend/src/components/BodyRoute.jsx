import React, { useState, useContext, useEffect } from "react";
import AppContext from "../AppContext";

import "./Styles.css";

const BodyRoute = () => {
  const context = useContext(AppContext);
  return (
    <div className="Body">
      <div className="Title">Menu</div>
      <hr className="hrBar"></hr>
      <div className="Button" onClick={() => context.button.set(3)}>
        Add Route
      </div>
      <div className="Button" onClick={() => context.button.set(4)}>
        Search Route
      </div>
    </div>
  );
};
export { BodyRoute as default };
