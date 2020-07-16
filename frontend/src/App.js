import React, { useState } from "react";
import AppContext from "./AppContext";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import './App.css';

import Header from "./components/Header";
import Menu from "./components/Menu";
import Body from "./components/Body";
import AddRoute from "./components/AddRoute";
import SearchRoute from "./components/SearchRoute";
import SearchBar from "./components/SearchBar";
import SearchSubroute from "./components/SearchSubroute";

const httpLink = new HttpLink ({
  uri: "http://127.0.0.1:4000/",
});

const client = new ApolloClient ({
  cache: new InMemoryCache(),
  link : httpLink,
});

function App() {
  const [button, setButton] = useState(1);
  const [nameRoute, setNameRoute] = useState(null);
  const [nameSubroute, setNameSubroute] = useState(null);

  const contextData = {
    button: {get: button, set: setButton},
    nameRoute: {get: nameRoute, set: setNameRoute},
    nameSubroute: {get: nameSubroute, set: setNameSubroute},
  }
  let content = null;

  //PAGE PRINCIPAL
  if(button === 1) {
    content = (
      <AppContext.Provider value={contextData}>
       <ApolloProvider client={client}>
         <Header/>
         <Menu/>
       </ApolloProvider>
     </AppContext.Provider>
    )
  }
  //BODY ROUTE
  if(button === 2) {
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
  if(button === 3) {
    content = (
      <AppContext.Provider value={contextData}>
       <ApolloProvider client={client}>
         <Header/>
         <AddRoute/>
       </ApolloProvider>
     </AppContext.Provider>
    )
  }
  //SEARCH BAR
  if(button === 4) {
    content = (
      <AppContext.Provider value={contextData}>
       <ApolloProvider client={client}>
         <Header/>
         <SearchBar/>
       </ApolloProvider>
     </AppContext.Provider>
    )
  }
  // SEARCH ROUTE
  if(button === 5) {
    content = (
      <AppContext.Provider value={contextData}>
       <ApolloProvider client={client}>
         <Header/>
         <SearchBar/>
         <SearchRoute/>
       </ApolloProvider>
     </AppContext.Provider>
    )
  }
  // SEARCH SUBROUTE
  if(button === 6) {
    content = (
      <AppContext.Provider value={contextData}>
       <ApolloProvider client={client}>
         <Header/>
         <SearchBar/>
         <SearchSubroute/>
       </ApolloProvider>
     </AppContext.Provider>
    )
  }
   //BODY SUBROUTE
   if(button === 7) {
    content = (
      <AppContext.Provider value={contextData}>
       <ApolloProvider client={client}>
         <Header/>
         <Body/>
       </ApolloProvider>
     </AppContext.Provider>
    )
  }
  console.log(nameRoute)
  return (
    <div className="App">
     {content}
    </div>
  );
}
export default App;