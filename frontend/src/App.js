import React, { useState } from "react";
import AppContext from "./AppContext";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import './App.css';

import Header from "./components/Header";

const httpLink = new HttpLink ({
  uri: "http://127.0.0.1:4002/",
});

const client = new ApolloClient ({
  cache: new InMemoryCache(),
  link : httpLink,
});

function App() {
  const [button, setButton] = useState(1);

  const contextData = {
    button: {get: button, set: setButton},
  }
  let content = null;

  if(button === 1) {
    content = (
      <AppContext.Provider value={contextData}>
       <ApolloProvider client={client}>
         <Header/>
       </ApolloProvider>
     </AppContext.Provider>
    )
  }

  return (
    <div className="App">
     {content}
    </div>
  );
}
export default App;