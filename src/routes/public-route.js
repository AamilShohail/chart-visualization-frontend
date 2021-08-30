import React from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import Login from "../pages/login";

function PublicRoute() {
  return (
    <div>
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
        <Route path={`${process.env.PUBLIC_URL}/`}>
          <Redirect to={`${process.env.PUBLIC_URL}/login`} />
        </Route>
      </Switch>
    </div>
  );
}

export default PublicRoute;
