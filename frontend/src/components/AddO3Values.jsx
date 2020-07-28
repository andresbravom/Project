import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const MUTATION = gql`
  mutation AddO3Values($route: ID!, $vehicleValues: ID!) {
    addO3Values(route: $route, vehicleValues: $vehicleValues) {
      _id
    }
  }
`;

const AddO3Values = () => {
  let inputRoute;
  let inputVehicleValues;

  const context = useContext(AppContext);

  const [addO3Values, { data }] = useMutation(MUTATION);
  const [click, setClick] = useState(false);

  return (
    <div className="AddSubroute">
    <form
      className="Module"
      onSubmit={(e) => {
        e.preventDefault();
        addO3Values({
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
        data.addO3Values ? (
          <div className="Status">O3 values saved succesfully</div>
        ) : click ? (
          <div className="Status">Ops something went wrong</div>
        ) : null
      ) : null}
      <button className="Botton" type="submit" onClick={() => setClick(true)}>
        Add O3 Values
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
  )
};
export { AddO3Values as default };
