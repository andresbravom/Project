import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const MUTATION = gql`
  mutation AddOValues($route: ID!, $vehicleValues: ID!) {
    addOValues(route: $route, vehicleValues: $vehicleValues) {
      _id
    }
  }
`;

const AddOValues = () => {
  let inputRoute;
  let inputVehicleValues;

  const context = useContext(AppContext);

  const [addOValues, { data }] = useMutation(MUTATION);
  const [click, setClick] = useState(false);

  return (
    <div className="AddSubroute">
      <form
        className="Module"
        onSubmit={(e) => {
          e.preventDefault();
          addOValues({
            variables: {
              route: inputRoute.value,
              vehicleValues: inputVehicleValues.value,
            },
          });
          inputRoute.value = null;
          inputVehicleValues.value = null;
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
            <div>
              <input
                required
                className="Input"
                placeholder="Insert _id Vehicle Values"
                ref={(node) => {
                    inputVehicleValues = node;
                }}
              />
            </div>
          </div>
        </div>
        {data ? (
          data.addOValues ? (
            <div className="Status">O values saved succesfully</div>
          ) : click ? (
            <div className="Status">Ops something went wrong</div>
          ) : null
        ) : null}
        <button className="Botton" type="submit" onClick={() => setClick(true)}>
          Add O Values
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
export { AddOValues as default };
