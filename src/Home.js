import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import app from "./base";

const Home = () => (
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
      if (error) return <p>Something went wrong...</p>;

      return (
        <div className="row">
          <h1>Home</h1>
          <h2>Welcome to K-Sato's App</h2>
          {data.posts.map(post => (
            <h4 key={post.id}>{post.title}</h4>
          ))}
          <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
      );
    }}
  </Query>
);

export default Home;
