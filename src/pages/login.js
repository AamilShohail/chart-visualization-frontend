import React from "react";
import Login from "../parts/auth/login";
import Particles from "react-particles-js";
import Alert from "../components/alert/Alert"

function login() {
  return (
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
      <Login />
    </div>
  );
}

export default login;
