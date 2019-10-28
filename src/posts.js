import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { app } from "./base";

const Posts = ({ currentUser }) => (
  <Query
    query={gql`
      {
        posts {
          id
          title
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Good things take time....</p>;
      if (error)
        return (
          <div>
            <p>Something went wrong...</p>
            <button onClick={() => app.auth().signOut()}>Sign out</button>
          </div>
        );

      return (
        <div className="row">
          <h1>Home Page</h1>
          <h3>User Email: {currentUser.email}</h3>
          <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
      );
    }}
  </Query>
);

export default Posts;
