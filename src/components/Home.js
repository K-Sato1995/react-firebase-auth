import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Posts from "./posts";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return <Posts currentUser={currentUser} />;
};

export default Home;
