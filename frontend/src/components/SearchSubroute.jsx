import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./Styles.css";

const QUERY = gql`
  query GetSubroute($name: String!) {
    getSubrouteName(name: $name) {
      _id
      name
      lenght
      speed
      segments {
        _id
        index
        lenghtSegment
        probability
        O
        OValues
      }
    }
  }
`;

const SearchSubroute = () => {
  const context = useContext(AppContext);

  const { loading, error, data, refetch, networkStatus } = useQuery(QUERY, {
    variables: { name: context.nameSubroute.get },
    notifyOnNetworkStatusChange: true,
  });
  if (networkStatus === 4) return <div>Refetching...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div className="SearchSubroute">
        <div className="Information">
            {data ? (
                <div className="Items">
                    <div className="Subroutes">
                        <div className="Title">Subroute</div>
                        <div>
                            <h4>Name:</h4>{data.getSubrouteName.name}
                        </div> 
                        <div >
                            <h4>_id Route:</h4> {data.getSubrouteName._id}
                        </div>
                        <div >
                            <h4>Lenght:</h4> {data.getSubrouteName.lenght}
                        </div>
                        <div >
                            <h4>Speed:</h4> {data.getSubrouteName.speed}
                        </div>
                    </div> 
                </div>
            ) : null}
        </div>
    </div>
  )
};
export { SearchSubroute as default };
