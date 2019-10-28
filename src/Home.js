import React, { useContext } from "react";
import { AuthContext } from "./Auth.js";
import Posts from "./posts";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return <Posts currentUser={currentUser} />;
};

export default Home;
