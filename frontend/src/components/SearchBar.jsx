import React, { useContext } from "react";
import AppContext from "../AppContext";

import "./Styles.css";

const SearchBar = () => {
  const context = useContext(AppContext);

  let content;

  if (context.button.get === 4 || context.button.get === 5) {
    content = (
      <div className="SearchBar">
        <div className="Title">Insert Data</div>
        <input
          id="inputField"
          className="Input"
          type="text"
          placeholder="Insert Route Name"
        ></input>
        <div
          className="Button"
          onClick={() => {
            context.nameRoute.set(document.getElementById("inputField").value);
            context.button.set(5);
          }}
        >
          Search
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
  } else if (context.button.get === 8 || context.button.get === 6) {
    content = (
      <div className="SearchBar">
        <div className="Title">Insert Data</div>
        <input
          id="inputField"
          className="Input"
          type="text"
          placeholder="Insert SubRoute Name"
        ></input>
        <div
          className="Button"
          onClick={() => {
            context.nameSubroute.set(
              document.getElementById("inputField").value
            );
            context.button.set(6);
          }}
        >
          Search
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
  }else if (context.button.get === 11 || context.button.get === 12) {
    content = (
      <div className="SearchBar">
        <div className="Title">Insert Data</div>
        <input
          id="inputField"
          className="Input"
          type="text"
          placeholder="Insert name SubRoute"
        ></input>
        <div
          className="Button"
          onClick={() => {
            context.nameSubroute.set(
              document.getElementById("inputField").value
            );
            context.button.set(12);
          }}
        >
          Search
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
  }else if (context.button.get === 13 || context.button.get === 14) {
    content = (
      <div className="SearchBar">
        <div className="Title">Insert Data</div>
        <input
          id="inputField"
          className="Input"
          type="text"
          placeholder="Insert name SubRoute"
        ></input>
        <div
          className="Button"
          onClick={() => {
            context.nameSubroute.set(
              document.getElementById("inputField").value
            );
            context.button.set(15);
          }}
        >
          Search
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
  }else if (context.button.get === 16 || context.button.get === 15) {
    content = (
      <div className="SearchBar">
        <div className="Title">Insert Data</div>
        <input
          id="inputField"
          className="Input"
          type="text"
          placeholder="Insert Subroute name"
        ></input>
        <div
          className="Button"
          onClick={() => {
            context.nameSubroute.set(
              document.getElementById("inputField").value
            );
            context.button.set(16);
          }}
        >
          Search
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
  }else if (context.button.get === 23 || context.button.get === 22) {
    content = (
      <div className="SearchBar">
        <div className="Title">Insert Data</div>
        <input
          id="inputField"
          className="Input"
          type="text"
          placeholder="Insert Route name"
        ></input>
        <div
          className="Button"
          onClick={() => {
            context.nameSubroute.set(
              document.getElementById("inputField").value
            );
            context.button.set(23);
          }}
        >
          Search
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
  return <div>{content}</div>;
};
export { SearchBar as default };
