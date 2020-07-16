import React, { useState, useContext, useEffect } from "react";
import AppContext from "../AppContext";

import "./Styles.css";

const Body = () => {
  const context = useContext(AppContext);

  let content;

  if(context.button.get === 2){
    content = (
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
    )
  }
  return (
    <div className="Body">
      {content}
    </div>
  );
};
export { Body as default };
