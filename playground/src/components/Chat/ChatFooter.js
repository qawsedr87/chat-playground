import React, { useRef, useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@mui/icons-material/Send";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#F5F5F5",
    // position: 'fixed',
    bottom: 0,
    borderBottomRightRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
  },
  input: {
    flexGrow: 1,
    marginRight: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  message: {
    flex: 1,
  },
  sendBtn: {
    float: "right",
  },
}));

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [typingStatus, setTypingStatus] = useState(false);
  const inputRef = useRef();
  const classes = useStyles();

  const handleTyping = () => {
    const status = `${localStorage.getItem("userName")} is typing`;
    socket.emit("typing", typingStatus ? status : "");
  };

  const handleSendMessage = (e) => {
    inputRef.current.focus();

    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        room: localStorage.getItem("userRoom"),
      });
    }
    setMessage("");
    
    // after sending the meesage, should change back the typing status
    setTypingStatus(false);
    socket.emit("typing", "");
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setTypingStatus(e.target.value.length > 1);
  };

  return (
    <div className={classes.footer}>
      <form className={classes.form} onSubmit={handleSendMessage}>
        <TextField
          ref={inputRef}
          variant="outlined"
          placeholder="Write message"
          className={classes.message}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleTyping}
        />

        <IconButton
          type="submit"
          color="default"
          aria-label="add to shopping cart"
        >
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
};

export default ChatFooter;
