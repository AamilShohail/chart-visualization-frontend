import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./private-route";
import NotFound from "../pages/NoAccess";
import SideBar from "../parts/sidebar/AdminSidebar";

import styles from "../style/Layout.module.css";

function UserRoutes() {
  return (
    <div className={styles.main_layout}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <Switch>
          <PrivateRoute
            component={Dashboard}
            path={`${process.env.PUBLIC_URL}/user/dashboard`}
            allowedRoles={["ROLE_USER"]}
          />
          <Route path={`${process.env.PUBLIC_URL}/not-found`} component={NotFound} />
          <Route path={`${process.env.PUBLIC_URL}/`}>
            <Redirect to={`${process.env.PUBLIC_URL}/user/dashboard`} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default UserRoutes;
