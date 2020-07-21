import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./Styles.css";

const QUERY = gql`
    query GetSubroute($name: String!){
        getSubrouteName(name: $name){
            segments {
                probability
            }
        }
    } 
`;

const AddProbability = () => {
    const context = useContext(AppContext);


    return(
        <div>
            AddProbability
        </div>
    )
}
export { AddProbability as default };
