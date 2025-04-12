import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const users = models.userListModel(); // Lấy danh sách người dùng từ model
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          User List
        </Typography>
        <List component="nav">
          {users.map((item) => (
            <React.Fragment key={item._id}>
              {/* Link để điều hướng tới UserDetail của người dùng */}
              <ListItem button component={Link} to={`/users/${item._id}`}>
                <ListItemText primary={`${item.first_name} ${item.last_name}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    );
}

export default UserList;
