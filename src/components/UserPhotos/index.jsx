import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText, Link } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchedPhotos = models.photoOfUserModel(userId);
    setPhotos(fetchedPhotos);
    const user = models.userModel(userId);
    if (user) {
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  }, [userId]);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString();
  };

  if (!photos || photos.length === 0) {
    return <Typography variant="body1">No photos found for this user.</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Photos of {userName || `User ${userId}`}
      </Typography>
      
      {photos.map((photo) => (
        <div key={photo._id} className="photo-item">
          <Typography variant="h6">Photo</Typography>
          <img 
            src={`/images/${photo.file_name}`} 
            alt={photo.file_name} 
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} 
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400?text=Image+Not+Found";
            }}
          />
          <Typography variant="body1" color="textSecondary">
            <strong>Created on:</strong> {formatDate(photo.date_time)}
          </Typography>
          <Typography variant="h6" color="textSecondary">Comments:</Typography>
          <List>
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <ListItem key={comment._id}>
                  <ListItemText
                    primary={
                      <Typography variant="body2">
                        <Link 
                          component={RouterLink} 
                          to={`/users/${comment.user._id}`} 
                          color="primary"
                        >
                          {comment.user.first_name} {comment.user.last_name}
                        </Link>
                        : {comment.comment}
                      </Typography>
                    }
                    secondary={formatDate(comment.date_time)}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2">No comments.</Typography>
            )}
          </List>
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;