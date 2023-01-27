import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Signin from "../routes/Signin";
import Signup from "routes/Signup";
import StmNow from "routes/StmNow";
import SchoolRelated from "routes/SchoolRelated";
import Board from "routes/Board";
import About from "routes/About";
import ResponsiveAppBar from "./AppBar";
import Logout from "routes/Logout";
import Post from "./post/Post";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <ResponsiveAppBar isLoggedIn={isLoggedIn} />
      <Switch>
        <>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home isLoggedIn={isLoggedIn} userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile isLoggedIn={isLoggedIn} userObj={userObj} />
              </Route>
              <Route exact path="/stmnow">
                <StmNow />
              </Route>
              <Route exact path="/school">
                <SchoolRelated />
              </Route>
              <Route exact path="/board">
                <Board />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/post/:postId">
                <Post />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <Home isLoggedIn={isLoggedIn} userObj={userObj} />
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
              <Route exact path="/stmnow">
                <StmNow />
              </Route>
              <Route exact path="/school">
                <SchoolRelated />
              </Route>
              <Route exact path="/board">
                <Board />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </>
          )}
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
