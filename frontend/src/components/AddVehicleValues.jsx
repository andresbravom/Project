import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const MUTATION = gql`
    mutation AddVehicleValues(
        $p: Float!, 
        $Cd: Float!, 
        $A: Float!, 
        $M: Float!, 
        $G: Float!, 
        $fr: Float!, 
        $a: Float!, 
        $alpha: Float!
        ) {
            addVehicleValues(
                p: $p, 
                Cd: $Cd, 
                A: $A, 
                M: $M, 
                G: $G, 
                fr: $fr, 
                a: $a, 
                alpha: $alpha,
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

  return <div>Vehicle Values</div>;
};
export { AddVehicleValues as default };
