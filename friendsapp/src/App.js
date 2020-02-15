import React, { useState, useEffect } from "react";

import { Route, Link, Switch, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import FriendsList from "./components/FriendsList";
import AddFriend from "./components/AddFriend";
import EditFriend from "./components/EditFriend";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  menuLink: {
    color: "white",
    textDecoration: "none",
    marginLeft: theme.spacing(3)
  }
}));

const App = props => {
  const classes = useStyles();

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");
  }, [token]);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <header className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.menuLink}>
                MyFriends
              </Link>
            </Typography>
            {!token ? (
              <Link to="/login" className={classes.menuLink}>
                Login
              </Link>
            ) : (
              <>
                <Link to="/add-friend" className={classes.menuLink}>
                  Add Friend
                </Link>
                <Link
                  to="#"
                  onClick={() => {
                    setToken("");
                    props.history.push("/login");
                  }}
                  className={classes.menuLink}
                >
                  Logout
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </header>
      <section>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/login"
            render={renderProps => (
              <Login {...renderProps} setToken={setToken} />
            )}
          />
          <PrivateRoute exact path="/friends" component={FriendsList} />
          <PrivateRoute exact path="/add-friend" component={AddFriend} />
          <PrivateRoute exact path="/edit-friend" component={EditFriend} />
        </Switch>
      </section>
    </Grid>
  );
};

export default withRouter(App);
