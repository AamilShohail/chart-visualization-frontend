import "./App.css";
import { Container, Typography } from "@material-ui/core";
import DropzoneArea from "./components/drag'n'drop/DropzoneArea";
import Dashboard from "./components/Dashboard";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import Loading from "./components/ui/Loading/Loading";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
function App() {
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);
  return IsLoading ? (
    <Loading />
  ) : (
    <Router>
      <div className="App">
        <Sidebar />
        <div  className="content">
        <Switch>
        <Route
      path={`${process.env.PUBLIC_URL}/file-upload`}
          component={FileUpload}
      />
      <Route
      path={`${process.env.PUBLIC_URL}`}
          component={Dashboard}
      />
        </Switch>
        </div>
      </div>
    </Router>
  );

}

function FileUpload() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" align="center">
        dragNdrop
      </Typography>
      <DropzoneArea />
    </Container>
  );
}



export default App;
