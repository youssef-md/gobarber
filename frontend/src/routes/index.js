import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function() {
  return (
    <Switch>
      <Route path="/" exact component={LogIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
}
