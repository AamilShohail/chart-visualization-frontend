import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import Loading from "./components/ui/loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import UserRoutes from "./routes/user-route";
import AdminRoutes from "./routes/admin-route";
import PublicRoute from "./routes/public-route";
import { loadUser } from "./store/auth-action";
import {role} from './constant'

function App() {
  const dispatch = useDispatch();
  const IsAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loggedUserRole = useSelector((state) => state.auth.role);
  const isLoading = useSelector(state=>state.ui.loading)
  const [IsAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    //for development
    dispatch(loadUser());
  }, [dispatch]);
  useEffect(() => {
    if (loggedUserRole === role.admin) setIsAdmin(true);
  }, [loggedUserRole]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Router>
      {IsAuthenticated ? IsAdmin ? <AdminRoutes /> : <UserRoutes /> : <PublicRoute />}
      {/* <Dg/> */}
    </Router>
  );
}

export default App;
