import React, { useState, useEffect } from "react";
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

const Login = props => {
  const classes = useStyles();
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) props.history.push("/");
  }, []);

  const attemptLogin = form => {
    setIsLoading(true);
    axiosWithAuth()
      .post("/login", creds)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        setIsLoading(false);
        setError("");
        props.setToken(res.data.payload);
        props.history.push("/friends");
      })
      .catch(() => {
        setError("Login Failed. Please try again.");
        localStorage.removeItem("token");
        setIsLoading(false);
      });
  };

  const handleChange = e =>
    setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    attemptLogin(creds);
  };

  return (
    <form onSubmit={handleSubmit} method="POST" className={classes.form}>
      <TextField
        name="username"
        value={creds.u}
        onChange={handleChange}
        label="Username"
        variant="outlined"
      />
      <TextField
        name="password"
        value={creds.p}
        onChange={handleChange}
        label="Password"
        variant="outlined"
        type="password"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        Login
      </Button>
      <Snackbar open={Boolean(error)} autoHideDuration={6000}>
        <MuiAlert severity="error">{error}</MuiAlert>
      </Snackbar>
      <p>{`i<3Lambd4`}</p>
    </form>
  );
};

export default Login;
