import React, { useContext } from "react";
import { AuthContext } from "./Auth.js";
import Posts from "./posts";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const token = currentUser.ra;
  const client = new ApolloClient({
    headers: {
      authorization: token ? `Bearer ${token}` : ""
    },
    uri: "http://localhost:3000/graphql"
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <Posts />
      </div>
    </ApolloProvider>
  );
};

export default Home;
