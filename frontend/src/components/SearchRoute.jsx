import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./Styles.css";

const QUERY = gql`
    query GetRoute($name: String!) {
        getRouteName(name: $name) {
            _id
            name
        }
    } 
`;

const SearchRoute = () => {
    const context = useContext(AppContext);

    const { loading, error, data, refetch, networkStatus } = useQuery(QUERY, {
        variables: {name: context.nameRoute.get},
        notifyOnNetworkStatusChange: true,
    });
    if (networkStatus === 4) return <div>Refetching...</div>
    if (loading) return <div>Loading...</div>
    if (error ) return <div>Error</div>

    // if(context.nameRoute.get !== null){
    //     console.log("Hola");
    // }else {
    //     console.log("adios")
    // }
    
    return(
        <div className="SearchRoute">
            {/* <input
                id="inputField"
                className="FormFields InputField"
                type="text"
                placeholder="Insert Route Name">
            </input>
            <div
            className="Button"
            onClick={() => context.nameRoute.set(document.getElementById("inputField").value)}>
                Search
            </div> */}

            <div>
                {data ? 
                <div> 
                    <div>
                        Name Route: {data.getRouteName.name}
                    </div>  
                    <div>
                        _id Route: {data.getRouteName._id}
                    </div>  
                </div>
                
                : null}
            </div>
        </div>
    )
}
export { SearchRoute as default };