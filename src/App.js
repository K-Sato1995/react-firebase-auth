import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import PrivateRoute from "./PrivateRoute";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { AuthContext } from "./Auth.js";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  let token = "";

  if (currentUser) {
    token = currentUser.ra;
  }

  const client = new ApolloClient({
    headers: {
      authorization: token ? `Bearer ${token}` : ""
    },
    uri: "http://localhost:3000/graphql"
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
