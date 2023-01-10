import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import NavBar from "./NavBar";
import Profile from "../routes/Profile";
import Signin from "../routes/Signin";
import Signup from "routes/Signup";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} userObj={userObj} />
      <Switch>
        <Route exact path="/">
          <Home isLoggedIn={isLoggedIn} userObj={userObj} />
        </Route>
        <Route exact path="/profile">
          <Profile isLoggedIn={isLoggedIn} userObj={userObj} />
        </Route>
        <Route exact path="/signin">
          {isLoggedIn ? (
            <Home isLoggedIn={isLoggedIn} userObj={userObj} />
          ) : (
            <Signin isLoggedIn={isLoggedIn} userObj={userObj} />
          )}
        </Route>
        <Route exact path="/signup">
          {isLoggedIn ? (
            <Home isLoggedIn={isLoggedIn} userObj={userObj} />
          ) : (
            <Signup isLoggedIn={isLoggedIn} userObj={userObj} />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
