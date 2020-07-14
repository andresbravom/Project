import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./Styles.css";

const QUERY = gql`
  query GetRoute($name: String!) {
    getRouteName(name: $name) {
      _id
      name
      subroutes {
        _id
        name
        lenght
        speed
      }
    }
  }
`;

const SearchRoute = () => {
  const context = useContext(AppContext);

  const { loading, error, data, refetch, networkStatus } = useQuery(QUERY, {
    variables: { name: context.nameRoute.get },
    notifyOnNetworkStatusChange: true,
  });
  if (networkStatus === 4) return <div>Refetching...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="SearchRoute">
      <div>
        {data ? (
          <div>
            <div>
              <h3>Name Route:</h3> {data.getRouteName.name}
            </div>
            <div>
              <h3>_id Route:</h3> {data.getRouteName._id}
            </div>
            <div>
              <h3>Subroutes:</h3>{" "}
              {data.getRouteName.subroutes.map((obj) => (
                <div>
                  <div>
                    <h4>Name:</h4> {obj.name}
                  </div>
                  <div>
                    <h4>_id:</h4> {obj._id}
                  </div>
                  <div>
                    <h4>Lenght:</h4> {obj.lenght} m
                  </div>
                  <div>
                    <h4>Speed:</h4> {obj.speed} k/h
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
export { SearchRoute as default };
