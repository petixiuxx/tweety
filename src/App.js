import React from "react";
import { YellowBox } from "react-native";
import AppContainer from "./navigation";
// import ApolloClient from "apollo-boost";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

import AsyncStorage from "@react-native-community/async-storage";

YellowBox.ignoreWarnings(["Slider"]);

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authentication: AsyncStorage.getItem("token") || null
    }
  }));

  return forward(operation);
});
const getSessionToken = () => {
  return AsyncStorage.getItem("token");
};
const authHeader = setContext(
  () =>
    new Promise(success => {
      getSessionToken().then(token =>
        success({ headers: { authentication: `Bearer ${token}` } })
      );
    })
);

const linkApollo = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  authHeader,
  new HttpLink({
    uri: "http://192.168.1.47:8000/graphql",
    credentials: "same-origin"
  })
]);

const client = new ApolloClient({
  link: linkApollo,
  cache: new InMemoryCache()
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AppContainer />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}
