import React, { useState } from "react";
import AppContext from "./AppContext";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import './App.css';

import Header from "./components/Header";
import Body from "./components/Body";

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

  //PAGE PRINCIPAL
  if(button === 1) {
    content = (
      <AppContext.Provider value={contextData}>
       <ApolloProvider client={client}>
         <Header/>
         <Body/>
       </ApolloProvider>
     </AppContext.Provider>
    )
  }
  //ADD ROUTE
  if(button === 2) {
    content = (
      <AppContext.Provider value={contextData}>
       <ApolloProvider client={client}>
         <Header/>
       </ApolloProvider>
     </AppContext.Provider>
    )
  }
  //SEARCH ROUTE
  if(button === 3) {
    content = (
      <AppContext.Provider value={contextData}>
       <ApolloProvider client={client}>
         <Header/>
       </ApolloProvider>
     </AppContext.Provider>
    )
  }
  console.log(button)
  return (
    <div className="App">
     {content}
    </div>
  );
}
export default App;