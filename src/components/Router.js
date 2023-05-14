import React from "react";
import About from "routes/About";

import Academics from "routes/Academics";
import Account from "routes/Account";
import Community from "routes/Community";
import Home from "routes/Home";
import Logout from "routes/Logout";
import Profile from "routes/Profile";
import Signin from "routes/Signin";
import Signup from "routes/Signup";

import NavBar from "components/NavBar";
import Post from "components/post/Post";

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} userObj={userObj} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/academics">
          <Academics />
        </Route>
        <Route exact path="/community">
          <Community />
        </Route>
        <Route exact path="/aboutus">
          <About />
        </Route>
        {isLoggedIn ? (
          <>
            <Route exact path="/profile">
              <Profile isLoggedIn={isLoggedIn} userObj={userObj} />
            </Route>
            <Route exact path="/account">
              <Account isLoggedIn={isLoggedIn} userObj={userObj} />
            </Route>
            <Route exact path="/post/:postId">
              <Post />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/signin">
              <Redirect to="/" />
            </Route>
            <Route exact path="signup">
              <Redirect to="/" />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/profile">
              <Redirect to="/" />
            </Route>
            <Route exact path="/account">
              <Redirect to="/" />
            </Route>
            <Route exact path="/post/:postId">
              <Redirect to="/" />
            </Route>
            <Route exact path="/logout">
              <Redirect to="/" />
            </Route>
            <Route exact path="/signin">
              <Signin
                isLoggedIn={isLoggedIn}
                userObj={userObj}
                refreshUser={refreshUser}
              />
            </Route>
            <Route exact path="/signup">
              <Signup isLoggedIn={isLoggedIn} userObj={userObj} />
            </Route>
          </>
        )}
        <Route>
          <h1>404 Not Found!</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
