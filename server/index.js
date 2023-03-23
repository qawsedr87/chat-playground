const express = require("express");
const cors = require("cors");
const http = require("http");
const io = require("socket.io");

const app = express();
const server = http.Server(app);

const PORT = 3001;
const SOCKET_URL = "http://localhost:3000";

app.use(cors());

// handle cors
const socketIO = io(server, {
  cors: {
    origin: SOCKET_URL,
  },
});

let users = [];

socketIO.on("connection", (socket) => {
  // once the user access the browser
  console.log(`⚡: ${socket.id} user just connected!`);

  /** add new user
   *
   * let user = {
   *    userName: string,
   *    sockerID: string
   * }
   *
   */
  const handleNewUser = (user) => {
    const { userName, socketID } = user;
    console.log(
      `+ : name ${userName} with ${
        socketID
      } joined the room!`
    );

    users.push(user);

    // send the list of users to playground
    socketIO.emit("newUserResponse", users);
  };

  // check who is typing
  const handleTyping = (data) => {
    socket.broadcast.emit("typingResponse", data);
  };

  /** gather whole messages
   *
   *  let data = {
   *    text: string,
   *    name: string,
   *    id: string,
   *    socketID: string,
   *    room: string
   *  }
   *
   * */
  const handleMessage = (data) => {
    socketIO.emit("messageResponse", data);
  };

  const handleDisconnect = () => {
    console.log(`🔥: ${socket.id} user disconnected!`);

    // update the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);

    // send updated the list of users to playground
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  };

  socket.on("message", handleMessage);
  socket.on("typing", handleTyping);
  socket.on("newUser", handleNewUser);
  socket.on("disconnect", handleDisconnect);
});

app.get("/health", (req, res) => {
  res.json({
    port: `${PORT}`,
    running: `Server runnning on ${SOCKET_URL}`,
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
