import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const App = () => {
  const token = "";

  const client = new ApolloClient({
    headers: {
      authorization: token ? `Bearer ${token}` : ""
    },
    uri: "http://localhost:3000/graphql"
  });

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </Router>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
