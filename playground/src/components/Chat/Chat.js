import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "./Chat.css";

const useStyles = makeStyles((theme) => ({
  chat: {
    display: "flex",
    flexDirection: "row",
    height: "90vh",
    padding: "20px",
    borderRadius: "10px",
    overflow: "hidden",
  },
  chatMain: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
  },
}));

const Chat = ({ socket }) => {
  const classes = useStyles();
  const navigator = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const isUserName = localStorage.getItem("userName");
    if (!isUserName) {
      navigator("/");
    }

    const handleMessageResponse = (message) => {
      setMessages([...messages, message]);
    };

    const handleTypingResponse = (typingStatusMsg) => {
      setTypingStatus(typingStatusMsg);
    };
    socket.on("messageResponse", handleMessageResponse);
    socket.on("typingResponse", handleTypingResponse);

    // scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, socket]);

  return (
    <>
      <div className={classes.chat}>
        {!isSmallScreen && <ChatBar socket={socket} />}
        <div className={classes.chatMain}>
          <ChatBody
            messages={messages}
            typingStatus={typingStatus}
            lastMessageRef={lastMessageRef}
            isSmallScreen={!isSmallScreen}
          />
          <ChatFooter socket={socket} />
        </div>
      </div>
    </>
  );
};

export default Chat;
