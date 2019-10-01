import React from 'react';
import { Switch, Route } from 'react-router';
import Home from '../pages/Home';
import Workflow from '../pages/Workflow';

// Routes with exact paths must be listed last
const Routes = () => (
  <Switch>
    <Route path="/:language/:workflow" component={Workflow} />
    <Route exact path="/" component={Home} />
  </Switch>
);

export default Routes;
