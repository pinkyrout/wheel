import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Navbar from "components/Common/Navbar";

import PasswordEdit from "./Account/Passwords/Edit";
import Contact from "./Contact";
import Profile from "./Account/Profile";
import Features from "./Features";
import Users from "./Users";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="content-main">
        <Switch>
          <Route exact path="/features" component={Features} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/my/password/edit" component={PasswordEdit} />
          <Route exact path="/my/profile" component={Profile} />
          <Redirect from="/" to="/features" />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
