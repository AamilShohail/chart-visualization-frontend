import "./App.css";
import { Container, CssBaseline, Typography } from "@material-ui/core";
import DropzoneArea from "./components/drag'n'drop/DropzoneArea";
import Dashboard from "./components/Admin/Dashboard";

function App() {
  return (
    <>

      <Dashboard/>
      
      <Container>
        {/* <Typography variant="h2" align="center">
        dragNdrop
      </Typography>
      <DropzoneArea /> */}
      </Container>
      <CssBaseline />
    </>
  );
}

export default App;
