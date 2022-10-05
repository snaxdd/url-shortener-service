import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GRAPHQL_URL } from "./constants/graphql";
import Echo from "laravel-echo";
import io from "socket.io-client";

export const apolloClient = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

window.io = io;
window.Echo = new Echo({
  broadcaster: "socket.io",
  host: "http://test-task.profilancegroup-tech.com:6002",
});

const app = document.getElementById("app");
const root = ReactDOM.createRoot(app);

root.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
