import { Component } from "react";
import { isAuth } from "../helpers/auth";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuth() && isAuth().role === "admin" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login/",
            state: { from: props.location },
          }}
        />
      )
    }></Route>
);

export default AdminRoute;
