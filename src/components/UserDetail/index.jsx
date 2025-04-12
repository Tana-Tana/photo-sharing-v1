import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models"; // Đảm bảo rằng models đã được import đúng

import "./styles.css";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams(); // Lấy userId từ URL params
  const [user, setUser] = useState(null);

  // Lấy thông tin người dùng khi component được mount
  useEffect(() => {
    const fetchedUser = models.userModel(userId);
    setUser(fetchedUser);
  }, [userId]);

  if (!user) {
    return <Typography variant="h6">Loading user details...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {user.occupation} - {user.location}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Description:</strong> {user.description}
      </Typography>

      {/* Link để chuyển tới trang ảnh của người dùng */}
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to={`/photos/${user._id}`}
      >
        View Photos
      </Button>
    </div>
  );
}

export default UserDetail;
