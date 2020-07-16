import React, { useState, useContext, useEffect } from "react";
import AppContext from "../AppContext";

import "./Styles.css";

const Body = () => {
  const context = useContext(AppContext);

  let content;

  if(context.button.get === 2){
    content = (
      <div className="Body">
      <div className="Title">Options</div>
      <hr className="hrBar"></hr>
      <div className="Button" onClick={() => context.button.set(3)}>
        Add Route
      </div>
      <div className="Button" onClick={() => context.button.set(4)}>
        Search Route
      </div>
      <div
          className="ButtonBar"
          onClick={() => {
            context.button.set(1);
            context.nameRoute.set(null);
          }}
        >
          Back
        </div>
    </div>
    )
  }else if(context.button.get === 7){
    content = (
      <div className="Body">
      <div className="Title">Options</div>
      <hr className="hrBar"></hr>
      <div className="Button" onClick={() => context.button.set(3)}>
        Add Suboute
      </div>
      <div className="Button" onClick={() => context.button.set(4)}>
        Search Subroute
      </div>
      <div
          className="ButtonBar"
          onClick={() => {
            context.button.set(1);
            context.nameRoute.set(null);
          }}
        >
          Back
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
