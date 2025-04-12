import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchedUser = models.userModel(userId);
    setUser(fetchedUser);
    setIsLoading(false);
  }, [userId]);

  if (isLoading) {
    return <Typography variant="h6">Loading user details...</Typography>;
  }

  if (!user) {
    return <Typography variant="h6">User not found.</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" color="textSecondary">
          <strong>ID:</strong> {user._id}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>First Name:</strong> {user.first_name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Last Name:</strong> {user.last_name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Occupation:</strong> {user.occupation}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Location:</strong> {user.location}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Description:</strong> {user.description}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/photos/${user._id}`}
      >
        View Photos
      </Button>
    </Box>
  );
}

export default UserDetail;