import React, { useState, useContext, useEffect } from "react";
import AppContext from "../AppContext";

import "./Styles.css";

const Body = () => {
  const context = useContext(AppContext);

  let content;

  if (context.button.get === 2) {
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
    );
  } else if (context.button.get === 7) {
    content = (
      <div className="Body">
        <div className="Title">Options</div>
        <hr className="hrBar"></hr>
        <div className="Button" onClick={() => context.button.set(9)}>
          Add Suboute
        </div>
        <div className="Button" onClick={() => context.button.set(8)}>
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
    );
  }else if (context.button.get === 10) {
    content = (
      <div className="Body">
        <div className="Title">Options</div>
        <hr className="hrBar"></hr>
        <div className="Button" onClick={() => context.button.set(11)}>
          Show Segments
        </div>
        <div className="Button" onClick={() => context.button.set(13)}>
          Add Segments
        </div>
        <div className="Button" onClick={() => context.button.set(15)}>
          Add Probability
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
    );
  }else if (context.button.get === 19) {
    content = (
      <div className="Body">
        <div className="Title">Options</div>
        <hr className="hrBar"></hr>
        <div className="Button" onClick={() => context.button.set(20)}>
          Show Vehicles Values
        </div>
        <div className="Button" onClick={() => context.button.set(18)}>
          Add Vehicles Values
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
    );
  }else if (context.button.get === 21) {
    content = (
      <div className="Body">
        <div className="Title">Options</div>
        <hr className="hrBar"></hr>
        <div className="Button" onClick={() => context.button.set(22)}>
          Show O Values
        </div>
        <div className="Button" onClick={() => context.button.set(24)}>
          Add O Values
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
    );
  }else if (context.button.get === 25) {
    content = (
      <div className="Body">
        <div className="Title">Options</div>
        <hr className="hrBar"></hr>
        <div className="Button" onClick={() => context.button.set(26)}>
          Add O3 Value
        </div>
        <div className="Button" onClick={() => context.button.set(27)}>
          Get Energy
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
    );
  }
  return <div className="Body">{content}</div>;
};
export { Body as default };
