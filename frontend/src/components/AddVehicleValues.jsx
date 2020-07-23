import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const MUTATION = gql`
  mutation AddVehicleValues($p: Float!, $Cd: Float!, $A: Float!, $M: Float!, $G: Float!, $fr: Float!, $a: Float!, $alpha: Float!) {
    addVehicleValues(p: $p, Cd: $Cd, A: $A, M: $M, G: $G, fr: $fr, a: $a, alpha: $alpha) {
      _id
    }
  }
`;

const AddVehicleValues = () => {
    let inputP;
    let inputCd;
    let inputA;
    let inputM;
    let inputG;
    let inputFr;
    let inputa;
    let inputAlpha;

    const context = useContext(AppContext);

    const [ addVehicleValues, {data} ] = useMutation(MUTATION);
    const [ click, setClick ] = useState(false);

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
export { AddVehicleValues as default };
