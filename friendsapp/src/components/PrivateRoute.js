import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={renderProps => {
        if (!localStorage.getItem("token")) return <Redirect to="/login" />;
        return <Component {...renderProps} />;
      }}
    />
  );
};

export default PrivateRoute;
