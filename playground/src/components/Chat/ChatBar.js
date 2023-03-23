import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chatSidebar: {
    backgroundColor: "#360F37",
    width: "30vh",
    height: "100%",
    borderTopLeftRadius: theme.spacing(1),
    borderBottomLeftRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    overflowY: "scroll",
    overscrollBehaviorY: "contain",
  },
  chatHeader: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  chatUsers: {
    marginLeft: theme.spacing(2),
    color: "#f5f5f5",
  },
  chatUser: {
    color: "#607eaa",
    padding: theme.spacing(1),
  },
  // myself
  currentUser: {
    color: "#81C981",
  },
}));

const ChatBar = ({ socket }) => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  const abstractUserName = (name) => {
    return name.length > 14 ? `${name.substring(0, 14)} ...` : name;
  };

  const handleNewUserResponse = (users) => {
    setUsers(users);
    setUserCount(users.length);
  };

  useEffect(() => {
    socket.on("newUserResponse", handleNewUserResponse);
  }, [socket, users, userCount]);

  return (
    <Box className={classes.chatSidebar}>
      <Box>
        <Typography variant="h6" component="h3" className={classes.chatHeader}>
          Active Users {userCount === 0 ? `` : `(${userCount})`}
        </Typography>
        <Box className={classes.chatUsers}>
          {users.map((user) => (
            <Typography
              key={user.socketID}
              className={`${classes.chatUser} ${
                user.userName === localStorage.getItem("userName")
                  ? classes.currentUser
                  : ""
              }`}
            >
              {abstractUserName(user.userName)}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBar;
