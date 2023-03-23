import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import socketIO from "socket.io-client";
import { Grid } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import "./App.css";

const SOCKET_URL = "http://localhost:3001";
const socket = socketIO.connect(SOCKET_URL);

const useStyles = makeStyles({
  root: {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1494376877685-d3d2559d4f82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <BrowserRouter>
            <div>
              <Routes>
                <Route path="/" element={<Home socket={socket} />}></Route>
                <Route path="/chat" element={<Chat socket={socket} />}></Route>

                {/* redirect the home page */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </BrowserRouter>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
