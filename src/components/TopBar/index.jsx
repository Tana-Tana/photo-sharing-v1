import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function TopBar() {
  const location = useLocation();
  const { userId } = useParams();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userId) {
      const user = models.userModel(userId);
      if (user) {
        setUserName(`${user.first_name} ${user.last_name}`);
      } else {
        setUserName("");
      }
    } else {
      setUserName("");
    }
  }, [userId]);

  const renderRightTitle = () => {
    if (location.pathname.startsWith(`/photos/${userId}`)) {
      return userName ? `Photos of ${userName}` : "PhotoShare App";
    }
    if (location.pathname.startsWith(`/users/${userId}`)) {
      return userName || "PhotoShare App";
    }
    return "PhotoShare App";
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" style={{ flex: 1 }}>
          Phan Thanh Tân
        </Typography>
        <Typography variant="h6" color="inherit">
          {renderRightTitle()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;