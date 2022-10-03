import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GRAPHQL_URL } from "./constants/graphql";

const app = document.getElementById("app");
const root = ReactDOM.createRoot(app);
const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
