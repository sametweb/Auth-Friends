import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosWithAuth";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  spinner: {
    marginLeft: "45%",
    marginTop: "10%"
  },
  modalButton: {
    marginLeft: theme.spacing(2)
  }
}));

const FriendsList = props => {
  const [friends, setFriends] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [error, setError] = useState("");
  const [friendToDelete, setFriendToDelete] = useState(null);

  const classes = useStyles();

  const handleOpen = id => {
    setFriendToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setFriendToDelete(null);
    setOpen(false);
  };

  const deleteFriend = id => {
    axiosWithAuth()
      .delete(`/friends/${id}`)
      .then(res => {
        setFriends(res.data);
        handleClose();
      })
      .catch(() =>
        setError(
          "Error occurred deleting your friend. Maybe it is a sign that you should not give up on people so easy."
        )
      );
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/friends")
      .then(res => setFriends(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!friends)
    return <CircularProgress className={classes.spinner} color="secondary" />;

  if (friends.length === 0) return <div>No friends in the list.</div>;

  return (
    <List className={classes.root}>
      {friends.map(friend => {
        return (
          <React.Fragment key={friend.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" />
              </ListItemAvatar>
              <ListItemText
                primary={friend.name}
                secondary={`${friend.age} y/o - ${friend.email}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() =>
                    props.history.push({
                      pathname: "/edit-friend",
                      state: friend
                    })
                  }
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleOpen(friend.id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
                <Modal open={open} onClose={handleClose}>
                  <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Are you sure?</h2>
                    <p id="simple-modal-description">
                      You are about to delete your friend. It is kinda hard
                      these days to make some.
                    </p>
                    <Button
                      onClick={() => deleteFriend(friendToDelete)}
                      variant="contained"
                      color="primary"
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.modalButton}
                    >
                      Nah, keep'em
                    </Button>
                  </div>
                </Modal>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
};
export default FriendsList;
