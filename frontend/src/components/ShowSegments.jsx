import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./Styles.css";

const QUERY = gql`
  query GetSubroute($name: String!) {
    getSubrouteName(name: $name) {
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

const ShowSegments = () => {
  const context = useContext(AppContext);

  const { loading, error, data, refetch, networkStatus } = useQuery(QUERY, {
    variables: { name: context.nameSubroute.get },
    notifyOnNetworkStatusChange: true,
  });
  if (networkStatus === 4) return <div>Refetching...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="ShowSegments">
        <div className="Information">
            {data ? (
                <div className="Segments">
                    <div className="Title">Segments</div>{" "}
              {data.getSubrouteName.segments.map((obj) => (
                <div>
                  <div>
                    <h4>Index:</h4> {obj.index}
                  </div>
                  <div>
                    <h4>_id:</h4> {obj._id}
                  </div>
                  <div>
                    <h4>Lenght Segment:</h4> {obj.lenghtSegment} m
                  </div>
                  <div>
                    <h4>Probability:</h4> {obj.probability}
                  </div>
                  <div>
                    <h4>O Type:</h4> {obj.O}
                  </div>
                  <div>
                    <h4>O Values:</h4> {obj.OValues} W/h
                  </div>
                </div>
              ))}
                </div>
            ) : null}
        </div>

    </div>
  ) 
};
export { ShowSegments as default };
