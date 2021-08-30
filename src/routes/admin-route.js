import React from "react";
import { Route, Switch, Redirect } from "react-router";
import SideBar from "../components/ui/sidebar/Sidebar";
import FileUpload from "../pages/File-Upload";
import UserDashboard from "../pages/Dashboard";
import AdminDashboards from "../pages/AdminDashboard";
import AdminGrid from "../components/Admin/Dashboard"
function AdminRoutes() {
  return (
    <div>
      <SideBar />
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/admin/file-upload`} component={FileUpload} />
        <Route path={`${process.env.PUBLIC_URL}/admin/users`} component={AdminDashboards} />
        <Route path={`${process.env.PUBLIC_URL}/admin/user-dashboard`} component={UserDashboard} />
        <Route path={`${process.env.PUBLIC_URL}/admin/home`} component={AdminGrid} />
        <Route path={`${process.env.PUBLIC_URL}/`}>
          <Redirect to={`${process.env.PUBLIC_URL}/admin/home`} />
        </Route>
      </Switch>
    </div>
  );
}

export default AdminRoutes;
