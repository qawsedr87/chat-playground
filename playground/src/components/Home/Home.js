import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  boxBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "30px",
    padding: "40px",
    backdropFilter: "blur(10px)",
  },
});

const Home = ({ socket }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("userName", userName);
    localStorage.setItem("userRoom", room);
    if (room !== "") {
      socket.emit("join_room", room);
    }

    //sends the username and socket ID to the Node.js server
    socket.emit("newUser", { userName, socketID: socket.id });
    // navigate("/playground");
    navigate("/chat");
  };

  return (
    <Container maxWidth="sm">
      <Box className={classes.boxBackground}>
        <Typography component="h1" variant="h5">
          Public Chat
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            disabled
            fullWidth
            id="room"
            label="Room"
            name="room"
            value="public"
            onChange={(e) => setRoom(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            minLength={6}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!userName}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#4A154B",
              "&:hover": {
                backgroundColor: "#360F37",
              },
              "&:active": {
                backgroundColor: "#4A154B",
              },
            }}
          >
            Enter
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
