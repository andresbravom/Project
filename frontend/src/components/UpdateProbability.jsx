import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AppContext from "../AppContext";

import "./Styles.css";

const UpdateProbability = () => {
    const context = useContext(AppContext);
    let array = [];

    if(context.segment.get){
      
        for(let i=0; i<context.segment.get; i += 1){
            array = [
                ...array,
                <div>
                    Add Probability
                </div>
            ]    
        }   
    }
    return(
        <div>
            {array}
        </div>
    )
}
export { UpdateProbability as default };
