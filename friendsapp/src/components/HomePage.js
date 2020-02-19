import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      Welcome to Friends!{" "}
      <Link to="/friends">Go to see your friends list.</Link>
    </div>
  );
};

export default HomePage;
