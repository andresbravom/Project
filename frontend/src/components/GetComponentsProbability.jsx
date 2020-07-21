import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./Styles.css";

const QUERY = gql`
    query GetSubroute($name: String!){
        getSubrouteName(name: $name){
            _id
            segments {
                probability
            }
        }
    } 
`;

const GetComponentsProbability = () => {
    let inputSubroute;
    const context = useContext(AppContext);

    const { loading, error, data, refetch, networkStatus } = useQuery(QUERY, {
        variables: { name: context.nameSubroute.get },
        notifyOnNetworkStatusChange: true,
      });
      if (networkStatus === 4) return <div>Refetching...</div>;
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;

    console.log(data.getSubrouteName);
    return(
        <div className="GetComponentsProbability">
            <div className="Information">
            {data ? (
                <div className="Segments">
                    <div className="Title">Segments</div>{" "}
              {/* {data.getSubrouteName.segments.map((obj) => (
               
              ))} */}
              {context.button.set(17), context.segment.set(data.getSubrouteName.segments.length), context.IDSubroute.set(data.getSubrouteName._id)}
                </div>
            ) : null}
        </div>
            
        </div>
    )
}
export { GetComponentsProbability as default };
