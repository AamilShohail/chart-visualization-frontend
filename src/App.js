import "./App.css";
import { Container, Typography } from "@material-ui/core";
import DropzoneArea from "./components/drag'n'drop/DropzoneArea";
import Dashboard from "./components/Dashboard";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import Loading from "./components/ui/Loading/Loading";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Particles from "react-particles-js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  const [IsLoading, setIsLoading] = useState(true);

  const [IsAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 100);
  }, []);
  return IsLoading ? (
    <Loading />
  ) : (
    <Router>
      <div className="App">
        {IsAuth ? (
          <>
            <Sidebar />
            <div className="content">
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
          </>
        ) : (
          <>
            <div
              style={{
                width: "100vw",
                height: "100vh",
                background: "black",
                position: "fixed",
                top: "0",
                left: "0",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100vw",
                  height: "100%",
                }}
              >
                <Particles
                height="100vh"
                width="100vw"

                  params={{
                    particles: {
                      number: {
                        value: 160,
                        density: {
                          enable: false,
                        },
                      },
                      size: {
                        value: 5,
                        random: true,
                      },
                      move: {
                        direction: "bottom",
                        out_mode: "out",
                      },
                      line_linked: {
                        enable: false,
                      },
                    },
                    interactivity: {
                      events: {
                        onclick: {
                          enable: true,
                          mode: "remove",
                        },
                      },
                      modes: {
                        remove: {
                          particles_nb: 10,
                        },
                      },
                    },
                  }}
                />
              </div>
              <Switch>
                <Route
                  path={`${process.env.PUBLIC_URL}/auth/register`}
                  component={Register}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/auth/login`}
                  component={Login}
                />
              </Switch>
            </div>
          </>
        )}
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
