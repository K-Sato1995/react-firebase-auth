import React from "react";
import { app } from "../base";
import { useQuery } from "@apollo/react-hooks";
import GET_POSTS from "../queries/getPosts";

const Posts = ({ currentUser }) => {
  const { data, loading, error } = useQuery(GET_POSTS);
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
      {data.posts.map(post => (
        <h4 key={post.id}>{post.title}</h4>
      ))}
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default Posts;
