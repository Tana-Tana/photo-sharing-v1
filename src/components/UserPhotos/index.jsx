import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText, Link } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import models from "../../modelData/models"; // Đảm bảo models đã được import đúng

import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams(); // Lấy userId từ URL params
  const [photos, setPhotos] = useState([]);

  // Lấy ảnh và bình luận của người dùng khi component được mount
  useEffect(() => {
    const fetchedPhotos = models.photoOfUserModel(userId);
    setPhotos(fetchedPhotos);
  }, [userId]);

  // Hàm để định dạng ngày giờ thành chuỗi dễ đọc
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString(); // Hoặc bạn có thể dùng thư viện như moment.js để format tốt hơn
  };

  if (!photos || photos.length === 0) {
    return <Typography variant="body1">No photos found for this user.</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Photos of User {userId}
      </Typography>
      
      {photos.map((photo) => (
        <div key={photo._id} className="photo-item">
          <Typography variant="h6">Photo: {photo.title}</Typography>
          <img src={photo.url} alt={photo.title} style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} />
          <Typography variant="body1" color="textSecondary">
            <strong>Created on:</strong> {formatDate(photo.creationDate)}
          </Typography>

          <Typography variant="h6" color="textSecondary">Comments:</Typography>
          <List>
            {photo.comments.map((comment) => (
              <ListItem key={comment._id}>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      <Link 
                        component={RouterLink} 
                        to={`/users/${comment.userId}`} 
                        color="primary"
                      >
                        {comment.userName}
                      </Link>
                      : {comment.text}
                    </Typography>
                  }
                  secondary={formatDate(comment.creationDate)}
                />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
