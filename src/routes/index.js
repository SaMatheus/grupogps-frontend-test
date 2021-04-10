import React from 'react';

// ROUTES
import Home from '../pages/Home';
import Magic from '../pages/Magic';

// ROUTER
import { Switch, Route, BrowserRouter } from 'react-router-dom';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/magic' component={Magic} />
        <Route path='*' component={() => <h1>Page not Found...</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
