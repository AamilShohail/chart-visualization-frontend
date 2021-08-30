import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./private-route";
import UserRoute from "./user-route";
import AdminRoute from "./admin-route";

function AppRoute() {
  return (
    <div>
      <Switch>
        {/* <Route path={`${process.env.PUBLIC_URL}`} component={Dashboard} /> */}
        <PrivateRoute
          Component={UserRoute}
          path={`${process.env.PUBLIC_URL}/user`}
          allowedRoles={["OWNER", "manager"]}
        />
        <PrivateRoute
          Component={AdminRoute}
          path={`${process.env.PUBLIC_URL}/admin`}
          allowedRoles={["OWNER", "manager"]}
        />
        <Route path={`${process.env.PUBLIC_URL}/`}>
          <Redirect to={`${process.env.PUBLIC_URL}/user`} />
        </Route>
      </Switch>
    </div>
  );
}

export default AppRoute;
