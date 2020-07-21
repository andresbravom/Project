import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const MUTATION = gql`
    mutation AddSegments($subroute: ID!) {
        addSegments(subroute: $subroute) { 
            _id 
        }
    }
`;
const AddSegments = () => {
  let inputSubroute;

  const context = useContext(AppContext);

  const [addSegments, { data }] = useMutation(MUTATION);
  const [click, setClick] = useState(false);

  return (
    <div className="AddSegments">
      <form
        className="Module"
        onSubmit={(e) => {
          e.preventDefault();
          addSegments({ variables: { subroute: inputSubroute.value } });
          inputSubroute.value = null;
        }}
      >
        <div className="Fields">
          <div className="Field">
            <div className="Title">Insert Data</div>
            <input
              required
              className="Input"
              placeholder="Insert _id Subroute"
              ref={(node) => {
                inputSubroute = node;
              }}
            />
          </div>
        </div>

        {data ? (
          data.addSegments ? (
            <div className="Status">Segments created succesfully</div>
          ) : click ? (
            <div className="Status">Ops something went wrong</div>
          ) : null
        ) : null}
        <button className="Botton" type="submit" onClick={() => setClick(true)}>
          Add Segments
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
export { AddSegments as default };
