import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const MUTATION = gql`
  mutation AddVehicleValues(
    $p: Float!
    $Cd: Float!
    $A: Float!
    $M: Float!
    $G: Float!
    $fr: Float!
    $a: Float!
    $alpha: Float!
  ) {
    addVehicleValues(
      p: $p
      Cd: $Cd
      A: $A
      M: $M
      G: $G
      fr: $fr
      a: $a
      alpha: $alpha
    ) {
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

  const [addVehicleValues, { data }] = useMutation(MUTATION);
  const [click, setClick] = useState(false);

  return (
    <div className="AddRoute">
      <form
        className="Module"
        onSubmit={(e) => {
          e.preventDefault();
          addVehicleValues({
            variables: {
              p: inputP,
              Cd: inputCd,
              A: inputA,
              M: inputM,
              G: inputG,
              fr: inputFr,
              a: inputa,
              alpha: inputAlpha,
            },
          });
          inputP.value = null;
          inputCd.value = null;
          inputA.value = null;
          inputM.value = null;
          inputG.value = null;
          inputFr.value = null;
          inputa.value = null;
          inputAlpha.value = null;
        }}
      >
        <div className="Fields">
          <div className="Field">
            <div className="Title">Insert Data</div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert air density value"
                ref={(node) => {
                  inputP = node;
                }}
              />
            </div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert Aerodynamic resistance coeffcient value"
                ref={(node) => {
                  inputCd = node;
                }}
              />
            </div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert Frontal Area value"
                ref={(node) => {
                  inputA = node;
                }}
              />
            </div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert Vehicle Mass value"
                ref={(node) => {
                  inputM = node;
                }}
              />
            </div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert Gravity value"
                ref={(node) => {
                  inputG = node;
                }}
              />
            </div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert Rolling Resistence Coefficient value"
                ref={(node) => {
                  inputFr = node;
                }}
              />
            </div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert Acceleration value"
                ref={(node) => {
                  inputa = node;
                }}
              />
            </div>
            <div>
              <input
                required
                className="Input"
                placeholder="Insert Alpha value"
                ref={(node) => {
                  inputAlpha = node;
                }}
              />
            </div>
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
          Add Values
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
