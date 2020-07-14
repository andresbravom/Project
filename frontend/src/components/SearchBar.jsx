import React, { useContext } from "react";
import AppContext from "../AppContext";

import "./Styles.css";

const SearchBar = () => {
  const context = useContext(AppContext);

  return (
    <div className="SearchBar">
      <input
        id="inputField"
        className="FormFields InputField"
        type="text"
        placeholder="Insert Route Name"
      ></input>
      <div
        className="Button"
        onClick={() => {
          context.nameRoute.set(document.getElementById("inputField").value);
          context.button.set(4);
        }}
      >
        Search
      </div>
      <div
        className="ButtonBar"
        onClick={() => {
          context.button.set(1);
        }}
      >
        Back
      </div>
    </div>
  );
};
export { SearchBar as default };
