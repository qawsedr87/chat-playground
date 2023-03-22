import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import socketIO from "socket.io-client";
import Container from "@material-ui/core/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import "./App.css";

const SOCKET_URL = "http://192.168.0.101:3001";
const socket = socketIO.connect(SOCKET_URL);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1494376877685-d3d2559d4f82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home socket={socket} />}></Route>
              <Route path="/chat" element={<Chat socket={socket} />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
