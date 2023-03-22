import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, useMediaQuery } from "@mui/material";
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
  const [isAuth, setIsAuth] = useState(true);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const isUserName = localStorage.getItem("userName");
    if (!isUserName) {
      setIsAuth(false);
      navigator("/");
    }
  }, []);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <>
      {isAuth ? (
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
      ) : (
        <Alert severity="error">Login with Username! PLEASE!</Alert>
      )}
    </>
  );
};

export default Chat;
