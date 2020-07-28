import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./Styles.css";

const QUERY = gql`
  query ShowOValues($name: String!) {
    getRouteName(name: $name) {
      subroutes {
        segments {
          OValues
        }
      }
    }
  }
`;

const ShowOValues = () => {
  const context = useContext(AppContext);

  const { loading, error, data, refetch, networkStatus } = useQuery(QUERY, {
    variables: { name: context.nameSubroute.get },
    notifyOnNetworkStatusChange: true,
  });
  if (networkStatus === 4) return <div>Refetching...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="ShowOValues">
      <div className="Information">
        {data ? (
          <div className="Items">
            <div className="Route">
              <div className="Title">Route</div>{" "}
              {data.getRouteName.subroutes.map((obj) => (
                <div>
                  <div className="SubrouteOValue">
                    <div className="Title">Subroute</div>{" "}
                    {obj.segments.map((obj1) => (
                      <div>
                        <div>
                          <h4>O Values:</h4> {obj1.OValues} Wh
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export { ShowOValues as default };
