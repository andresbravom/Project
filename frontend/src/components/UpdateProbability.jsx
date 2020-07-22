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

const a = () => {
  
}

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
              // ref={(node) => {
              //   inputProbability = node;
              // }}
            />
          </div>
        </div>,
      ];
      // array2.push(parseFloat(inputProbability.value))
      
    }
     
    content = (
        <div>
        <div className="AddRoute">
          <form
            className="Module"
            onSubmit={(e) => {
              e.preventDefault();
              for(let i=0; i<context.segment.get; i += 1){
                array2.push(parseFloat(document.getElementById("probabilityID" + i).value))
              }
              addProbability({ variables: { subroute: context.IDSubroute.get, 
                probability: array2 } });
              
            }}
          >
          <button className="Botton" type="submit" onClick={() => setClick(true)}>
          Add Probability
        </button>
          </form>
        </div>
        </div>
    )

    // content = (
    //     <div className="AddRoute">
    //       <form
    //         className="Module"
    //         onSubmit={(e) => {
    //           e.preventDefault();
    //           addProbability({ variables: { subroute: context.IDSubroute.get, probability: [parseFloat(inputProbability.value)] } });
    //           inputProbability.value = 0;
    //         }}
    //       >
    //         <div className="Fields">
    //           <div className="Field">
    //             <div className="Title">Insert Data</div>
    //             <input
    //               required
    //               className="Input"
    //               placeholder="Insert probability"
    //               ref={(node) => {
    //                 inputProbability = node;
    //               }}
    //             />
    //           </div>
    //         </div>
    //         <button className="Botton" type="submit" onClick={() => setClick(true)}>
    //       Add Probability
    //     </button>
    //       </form>
    //     </div>
    // )
    //   ];
    // }
  }
  console.log(array2);
  return (
    <div>
      <div>
        {array}
      </div>
      <div>
        {content}
      </div>
    </div>
  
  )
};
export { UpdateProbability as default };
