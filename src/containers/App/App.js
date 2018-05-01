import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Auth from '../Auth';
import Profile from '../Profile';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/auth" component={Auth} />
    <Route exact path="/profile" component={Profile} />
  </Switch>
);

export default App;
