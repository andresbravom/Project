import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./Styles.css";

const QUERY = gql`
  query GetVehicleValues {
    getVehicleValues {
      _id
      p
      Cd
      A
      M
      G
      fr
      a
      alpha
    }
  }
`;

const ShowVehicleValues = () => {

  const { loading, error, data, refetch, networkStatus } = useQuery(QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  if (networkStatus === 4) return <div>Refetching...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="ShowVehicleValues">
    <div className="Information">
        {data ? (
            <div className="Routes">
                <div className="Title">Vehicle Values</div>{" "}
          {data.getVehicleValues.map((obj) => (
            <div>
              <div>
                <h4>_id:</h4> {obj._id}
              </div>
              <div>
                <h4>p:</h4> {obj.p}
              </div>
              <div>
                <h4>Cd:</h4> {obj.Cd} 
              </div>
              <div>
                <h4>A:</h4> {obj.A}
              </div>
              <div>
                <h4>M:</h4> {obj.M}
              </div>
              <div>
                <h4>G:</h4> {obj.G}
              </div>
              <div>
                <h4>fr:</h4> {obj.fr}
              </div>
              <div>
                <h4>a:</h4> {obj.a}
              </div>
              <div>
                <h4>alpha:</h4> {obj.alpha}
              </div>
            </div>
          ))}
            </div>
        ) : null}
    </div>
</div>
  )
  
};
export { ShowVehicleValues as default };
