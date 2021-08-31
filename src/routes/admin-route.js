import React from "react";
import { Route, Switch, Redirect } from "react-router";
import SideBar from "../components/ui/sidebar/Sidebar";
import FileUpload from "../pages/File-Upload";
import UserDashboard from "../pages/Dashboard";
import AdminDashboards from "../pages/AdminDashboard";
import AdminGrid from "../components/Admin/Dashboard";
import PrivateRoute from "./private-route";
import NotFound from "../pages/NoAccess";
function AdminRoutes() {
  return (
    <div>
      <SideBar />
      <Switch>
        <PrivateRoute
          component={FileUpload}
          path={`${process.env.PUBLIC_URL}/admin/file-upload`}
          allowedRoles={["ROLE_ADMIN"]}
        />
        <PrivateRoute
          component={AdminDashboards}
          path={`${process.env.PUBLIC_URL}/admin/users`}
          allowedRoles={["ROLE_ADMIN"]}
        />
        <PrivateRoute
          component={UserDashboard}
          path={`${process.env.PUBLIC_URL}/admin/user-dashboard`}
          allowedRoles={["ROLE_ADMIN"]}
        />
        <PrivateRoute
          component={AdminGrid}
          path={`${process.env.PUBLIC_URL}/admin/home`}
          allowedRoles={["ROLE_ADMIN"]}
        />
        <Route path={`${process.env.PUBLIC_URL}/not-found`} component={NotFound} />
        <Route path={`${process.env.PUBLIC_URL}/`}>
          <Redirect to={`${process.env.PUBLIC_URL}/admin/home`} />
        </Route>
      </Switch>
    </div>
  );
}

export default AdminRoutes;
