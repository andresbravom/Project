import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const MUTATION = gql`
  mutation AddSubroute(
    $route: ID!
    $name: String!
    $lenght: Float!
    $speed: Int!
  ) {
    addSubroute(route: $route, name: $name, lenght: $lenght, speed: $speed) {
      _id
      name
      lenght
      speed
    }
  }
`;

const AddSubroute = () => {
  let inputRoute;
  let inputName;
  let inputLenght;
  let inputSpeed;

  const context = useContext(AppContext);

  const [addSubroute, { data }] = useMutation(MUTATION);
  const [click, setClick] = useState(false);

  return (
    <div className="AddSubroute">
      <form
        className="Module"
        onSubmit={(e) => {
          e.preventDefault();
          addSubroute({
            variables: {
              route: inputRoute.value,
              name: inputName.value,
              lenght: parseFloat(inputLenght.value),
              speed: parseInt(inputSpeed.value),
            },
          });
          inputRoute.value = null;
          inputName.value = null;
          inputLenght.value = 0;
          inputSpeed.value = 0;
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
                placeholder="Insert name Subroute"
                ref={(node) => {
                  inputName = node;
                }}
              />
            </div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert lenght Subroute"
                ref={(node) => {
                  inputLenght = node;
                }}
              />
            </div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert speed Subroute"
                ref={(node) => {
                  inputSpeed = node;
                }}
              />
            </div>
          </div>
        </div>
        {data ? (
          data.addSubroute ? (
            <div className="Status">Subroute created succesfully</div>
          ) : click ? (
            <div className="Status">Ops something went wrong</div>
          ) : null
        ) : null}
        <button className="Botton" type="submit" onClick={() => setClick(true)}>
          Add Subroute
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
export { AddSubroute as default };
