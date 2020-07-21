import React, { useState } from "react";
import AppContext from "./AppContext";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import "./App.css";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Body from "./components/Body";
import AddRoute from "./components/AddRoute";
import SearchRoute from "./components/SearchRoute";
import SearchBar from "./components/SearchBar";
import SearchSubroute from "./components/SearchSubroute";
import AddSubroute from "./components/AddSubroute";
import ShowSegments from "./components/ShowSegments";
import GetComponentsProbability from "./components/GetComponentsProbability";
import AddSegments from "./components/AddSegments";
import UpdateProbability from "./components/UpdateProbability";

const httpLink = new HttpLink({
  uri: "http://127.0.0.1:4000/",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

function App() {
  const [button, setButton] = useState(1);
  const [nameRoute, setNameRoute] = useState(null);
  const [nameSubroute, setNameSubroute] = useState(null);
  const [segment, setSegments] = useState(0);
  const [IDSubroute, setIDSubroute] = useState(null);

  const contextData = {
    button: { get: button, set: setButton },
    nameRoute: { get: nameRoute, set: setNameRoute },
    nameSubroute: { get: nameSubroute, set: setNameSubroute },
    segment: { get: segment, set: setSegments },
    IDSubroute: { get: IDSubroute, set: setIDSubroute},
  };
  let content = null;

  //PAGE PRINCIPAL
  if (button === 1) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <Menu />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //BODY ROUTE
  if (button === 2) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <Body />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //ADD ROUTE
  if (button === 3) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <AddRoute />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //SEARCH BAR ROUTE
  if (button === 4) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <SearchBar />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //SEARCH BAR SUBROUTE
  if (button === 8) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <SearchBar />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  // SEARCH ROUTE
  if (button === 5) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <SearchBar />
          <SearchRoute />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  // SEARCH SUBROUTE
  if (button === 6) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <SearchBar />
          <SearchSubroute />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //BODY SUBROUTE
  if (button === 7) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <Body />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //ADD SUBROUTE
  if (button === 9) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <AddSubroute />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //BODY SEGMENTS
  if (button === 10) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <Body />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //SEARCH BAR SEGMENTS
  if (button === 11) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <SearchBar />
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //SHOW SEGMENTS
  if (button === 12) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <SearchBar/>
          <ShowSegments/>
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //ADD SEGMENTS
  if (button === 13) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header />
          <AddSegments/>
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //ADD PROBABILITY SEARCH BAR
  if (button === 14) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header/>
          <SearchBar/>
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //SEARCH BAR ADD PROBABILITY
  if (button === 15) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header/>
          <SearchBar/>
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //ADD PROBABILITY
  if (button === 16) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header/>
          <SearchBar/>
          <GetComponentsProbability/>
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  //UPDATE PROBABILITY
  if (button === 17) {
    content = (
      <AppContext.Provider value={contextData}>
        <ApolloProvider client={client}>
          <Header/>
          <SearchBar/>
          <UpdateProbability/>
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
  console.log(button);
  return <div className="App">{content}</div>;
}
export default App;
