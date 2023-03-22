const express = require("express");
const cors = require("cors");

const app = express();
const http = require("http").Server(app);

const PORT = 3001;
const SOCKET_URL = "http://192.168.0.101:3000";

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: SOCKET_URL,
  },
});

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);

    // TODO: for Room
    // socketIO.to(data.room).emit("receiveMessage", data);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  // listen when a new user joins the server
  socket.on("newUser", (data) => {
    users.push(data);

    // send the list of users to playground
    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");

    // update the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);

    // send updated the list of users to playground
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

// FIXME: delete later
app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
