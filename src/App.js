import "./App.css";
import Dashboard from "./pages/Dashboard";
import FileUpload from "./pages/File-Upload";
import AdminDashboard from "./pages/AdminDashboard";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import Loading from "./components/ui/Loading/Loading";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import Login from "./pages/login";
import {useSelector} from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  const [IsLoading, setIsLoading] = useState(true);
  // const [IsAuthenticated, setIsAuthenticated] = useState(true);

  const IsAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);
  if(IsLoading){
    return <Loading/>
  }
  return !IsAuthenticated ? (
    <Login />
  ) : (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
            <Route path={`${process.env.PUBLIC_URL}/file-upload`} component={FileUpload} />
            <Route path={`${process.env.PUBLIC_URL}/admin-dashboard`} component={AdminDashboard} />
            <Route path={`${process.env.PUBLIC_URL}`} component={Dashboard} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
