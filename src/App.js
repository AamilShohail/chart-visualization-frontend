import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import Loading from "./components/ui/loading/Loading";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import UserRoutes from "./routes/user-route";
import AdminRoutes from "./routes/admin-route";
import PublicRoute from "./routes/public-route";

function App() {
  const [IsLoading, setIsLoading] = useState(true);
  const IsAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const [IsAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);
  useEffect(() => {
    if (role === "ROLE_ADMIN") setIsAdmin(true);
  }, [role]);
  if (IsLoading) {
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
