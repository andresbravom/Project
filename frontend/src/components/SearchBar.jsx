import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./Styles.css";



const SearchBar = () => {
    const context = useContext(AppContext);

    // if(context.nameRoute.get !== null){
    //     console.log("Hola");
    // }else {
    //     console.log("adios")
    // }
    
    return(
        <div className="SearchRoute">
            <input
                id="inputField"
                className="FormFields InputField"
                type="text"
                placeholder="Insert Route Name">
            </input>
            <div
            className="Button"
            onClick={() => {context.nameRoute.set(document.getElementById("inputField").value); context.button.set(4)}}>
                Search
            </div>

            {/* <div>
                {data ? data.getRouteName.name: null}
            </div> */}
        </div>
    )
}
export { SearchBar as default };