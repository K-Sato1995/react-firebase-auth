import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import app from "./base";

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
      if (error) return <p>Something went wrong...</p>;

      return (
        <div className="row">
          <h1>Home Page</h1>
          {data.posts.map(post => (
            <h4 key={post.id}>{post.title}</h4>
          ))}
          <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
      );
    }}
  </Query>
);

export default Posts;
