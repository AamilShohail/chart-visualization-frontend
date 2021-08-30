import React from "react";
import { Route, Switch, Redirect } from "react-router";
import SideBar from "../components/ui/sidebar/Sidebar";
import FileUpload from "../pages/File-Upload";
import Dashboard from "../pages/Dashboard";
import AdminDashboards from "../pages/AdminDashboard";

function UserRoutes() {
  return (
    <div>
      {/* <SideBar /> */}
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/user/dashboard`} component={Dashboard} />
        <Route path={`${process.env.PUBLIC_URL}/`}>
          <Redirect to={`${process.env.PUBLIC_URL}/user/dashboard`} />
        </Route>
      </Switch>
    </div>
  );
}

export default UserRoutes;
