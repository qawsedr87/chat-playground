import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#360F37",
    borderTopRightRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
  },
  leaveToolbar: {
    display: "flex",
    justifyContent: "space-between",
    boxShadow: theme.shadows[2],
  },
  leaveChatBtn: {
    backgroundColor: "#360F37",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4A154B",
      boxShadow: theme.shadows[2],
    },
    float: "right",
  },
}));

const ChatBody = ({
  messages,
  typingStatus,
  lastMessageRef,
  isSmallScreen,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRoom");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.leaveToolbar}>
          {isSmallScreen && (
            <Typography variant="h6">
              Ask/Answer/Chat
            </Typography>
          )}
          <Button
            endIcon={<ExitToAppIcon />}
            className={classes.leaveChatBtn}
            onClick={handleLeaveChat}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">{message.name} (You)</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/* <div className="message__status">
          <p>{typingStatus}</p>
        </div> */}

        {/* <div ref={lastMessageRef} /> */}
      </div>
    </>
  );
};

export default ChatBody;
