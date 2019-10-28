import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { app, db } from "./base";

const addUser = () => {
  db.collection("users").add({
    age: 14,
    name: "From the app",
    role: "sub-admin"
  });
};

const fetchUsers = () => {
  db.collection("users")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.id);
        console.log(doc.data());
      });
    });
};

const Posts = () => (
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
          <button onClick={() => app.auth().signOut()}>Sign out</button>
          <button onClick={addUser}>Add user</button>
          <button onClick={fetchUsers}>Fetch users</button>
        </div>
      );
    }}
  </Query>
);

export default Posts;
