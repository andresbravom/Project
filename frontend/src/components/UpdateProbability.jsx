import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const MUTATION = gql`
  mutation AddProbability($subroute: ID!, $probability: [Float!]) {
    addProbability(subroute: $subroute, probability: $probability) {
      _id
    }
  }
`;

const UpdateProbability = () => {
  const context = useContext(AppContext);
  let array = [];
  let array2 = [];
  let content;

  const [addProbability, { data }] = useMutation(MUTATION);
  const [click, setClick] = useState(false);

  if (context.segment.get) {
    for (let i = 0; i < context.segment.get; i += 1) {
      array = [
        ...array,
        <div className="Fields">
          <div className="Field">
            <div className="Title">Insert Data</div>
            <input
              required
              className="Input"
              placeholder="Insert probability"
              id={"probabilityID" + i}
            />
          </div>
        </div>,
      ];
    }
    content = (
      <div>
        <div className="AddRoute">
          <form
            className="Module"
            onSubmit={(e) => {
              e.preventDefault();
              for (let i = 0; i < context.segment.get; i += 1) {
                array2.push(
                  parseFloat(document.getElementById("probabilityID" + i).value)
                );
              }
              addProbability({
                variables: {
                  subroute: context.IDSubroute.get,
                  probability: array2,
                },
              });
            }}
          >
            <button
              className="Botton"
              type="submit"
              onClick={() => setClick(true)}
            >
              Add Probability
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>{array}</div>
      <div>{content}</div>
    </div>
  );
};
export { UpdateProbability as default };
