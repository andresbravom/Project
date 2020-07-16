import React, { useState, useContext, useEffect } from "react";
import AppContext from "../AppContext";

import "./Styles.css";

const Menu = () => {
  const context = useContext(AppContext);
  return (
    <div className="Body">
      <div className="Title">Menu</div>
      <hr className="hrBar"></hr>
      <div className="Button" onClick={() => context.button.set(2)}>
        Route
      </div>
      <div className="Button" onClick={() => context.button.set(3)}>
        Subroute
      </div>
    </div>
  );
};
export { Menu as default };