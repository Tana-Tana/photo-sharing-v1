import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import models from "../../modelData/models"; // Đảm bảo models đã được import đúng

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const { userId } = useParams(); // Lấy userId từ URL (chỉ có trong các route liên quan đến user)

  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Kiểm tra nếu đang ở trang chi tiết người dùng hoặc ảnh người dùng
    if (userId) {
      const user = models.userListModel().find(user => user.id === userId);
      if (user) {
        setUserName(user.first_name + " " + user.last_name); // Cập nhật tên người dùng
      }
    } else {
      setUserName(""); // Nếu không có userId thì không hiển thị tên người dùng
    }
  }, [userId, location]); // Cập nhật lại khi userId hoặc location thay đổi

  const renderTitle = () => {
    if (userId) {
      // Nếu đang ở trang chi tiết người dùng
      return userName;
    } else if (location.pathname.includes("photos")) {
      // Nếu đang ở trang ảnh của người dùng
      return `Photos of ${userName}`;
    }
    return "PhotoShare App"; // Tên mặc định nếu không phải trang chi tiết người dùng hay ảnh người dùng
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" style={{ flex: 1 }}>
          Name User
        </Typography>
        <Typography variant="h6" color="inherit">
          {renderTitle()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
