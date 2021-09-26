import React from "react";
import { Route, Switch, Redirect } from "react-router";

import SideBar from "../parts/sidebar/AdminSidebar";
import UserDashboard from "../pages/Dashboard";
import AdminDashboards from "../pages/AdminDashboard";
import NotFound from "../pages/NoAccess";

import PrivateRoute from "./private-route";

import styles from "../style/Layout.module.css";
function AdminRoutes() {
  return (
    <div className={styles.main_layout}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <Switch>
          <PrivateRoute
            component={UserDashboard}
            path={`${process.env.PUBLIC_URL}/admin/user-dashboard`}
            allowedRoles={["ROLE_ADMIN"]}
          />
          <PrivateRoute
            component={AdminDashboards}
            path={`${process.env.PUBLIC_URL}/admin/home`}
            allowedRoles={["ROLE_ADMIN"]}
          />
          <Route path={`${process.env.PUBLIC_URL}/not-found`} component={NotFound} />
          <Route path={`${process.env.PUBLIC_URL}/`}>
            <Redirect to={`${process.env.PUBLIC_URL}/admin/home`} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default AdminRoutes;
