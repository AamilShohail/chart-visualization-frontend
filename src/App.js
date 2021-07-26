import "./App.css";
import { Container, Typography } from "@material-ui/core";
import DropzoneArea from "./components/drag'n'drop/DropzoneArea";

function App() {
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
