import React, { useState } from "react";
import { TextField, Button, Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { axiosWithAuth } from "../axiosWithAuth";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    "& .MuiInputBase-formControl": {
      marginBottom: theme.spacing(1)
    }
  }
}));

const AddFriend = props => {
  const [friend, setFriend] = useState({ name: "", age: "", email: "" });
  const [error, setError] = useState("");
  const classes = useStyles();

  const handleChange = event =>
    setFriend({ ...friend, [event.target.name]: event.target.value });

  const handleSubmit = event => {
    event.preventDefault();

    if (!friend.name || !friend.age || !friend.email) {
      setError("All the fields are required.");
      return null;
    }
    axiosWithAuth()
      .post("/friends", { id: Date.now(), ...friend })
      .then(() => {
        setError("");
        props.history.push("/friends");
      })
      .catch(() =>
        setError("An error occured while adding your friend. Please try again.")
      );
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        name="name"
        value={friend.name}
        onChange={handleChange}
        label="Name"
        variant="outlined"
      />
      <TextField
        name="age"
        type="number"
        value={friend.age}
        onChange={handleChange}
        label="Age"
        variant="outlined"
      />
      <TextField
        name="email"
        type="email"
        value={friend.email}
        onChange={handleChange}
        label="Email"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Add New Friend
      </Button>
      <Snackbar open={Boolean(error)} autoHideDuration={6000}>
        <MuiAlert severity="error">{error}</MuiAlert>
      </Snackbar>
    </form>
  );
};

export default AddFriend;
