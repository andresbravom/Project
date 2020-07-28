import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const MUTATION = gql`
  mutation AddEnergyRoute($route: ID!) {
    addEnergyRoute(route: $route) {
      _id
    }
  }
`;

const GetEnergy = () => {
  let inputRoute;

  const context = useContext(AppContext);

  const [addEnergyRoute, { data }] = useMutation(MUTATION);
  const [click, setClick] = useState(false);

  return (
    <div className="AddSubroute">
      <form
        className="Module"
        onSubmit={(e) => {
          e.preventDefault();
          addEnergyRoute({
            variables: {
              route: inputRoute.value,
            },
          });
          inputRoute.value = null;
        }}
      >
        <div className="Fields">
          <div className="Field">
            <div className="Title">Insert Data</div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert _id route"
                ref={(node) => {
                  inputRoute = node;
                }}
              />
            </div>
          </div>
        </div>
        {data ? (
          data.addEnergyRoute ? (
            <div className="Status">Energy values saved succesfully</div>
          ) : click ? (
            <div className="Status">Ops something went wrong</div>
          ) : null
        ) : null}
        <button className="Botton" type="submit" onClick={() => setClick(true)}>
          Add Energy Values
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
export { GetEnergy as default };
