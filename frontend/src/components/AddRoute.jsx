import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const MUTATION = gql`
  mutation AddRoute($name: String!) {
    addRoute(name: $name) {
      name
    }
  }
`;

const AddRoute = () => {
  let inputNameRoute;

  const context = useContext(AppContext);

  const [addRoute, { data }] = useMutation(MUTATION);
  const [click, setClick] = useState(false);

  return (
    <div className="AddRoute">
      <form
        className="Module"
        onSubmit={(e) => {
          e.preventDefault();
          addRoute({ variables: { name: inputNameRoute.value } });
          inputNameRoute.value = null;
        }}
      >
        <div className="Fields">
          <div className="Field">
            <div className="Title">Insert Data</div>
            <input
              required
              className="Input"
              placeholder="Insert name route"
              ref={(node) => {
                inputNameRoute = node;
              }}
            />
          </div>
        </div>
        {data ? (
          data.addRoute ? (
            <div className="Status">Route created succesfully</div>
          ) : click ? (
            <div className="Status">Ops something went wrong</div>
          ) : null
        ) : null}
        <button className="Botton" type="submit" onClick={() => setClick(true)}>
          Add Route
        </button>
        <div
          className="ButtonBar"
          onClick={() => {
            context.button.set(1);
          }}
        >
          Back
        </div>
      </form>
    </div>
  );
};
export { AddRoute as default };
