import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import Home from './containers/Home/Home';
import graphTableView from './connect-views/graphTableView/graphTableView';
import NotFoundView from './static-views/NotFoundView/NotFoundView';

export default (
  <Route path="/" component={Home}>
    <IndexRoute component={graphTableView}/>
    <Redirect from="*" to="404"/>
  </Route>
);