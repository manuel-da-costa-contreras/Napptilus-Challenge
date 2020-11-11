import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Local Imports
import { MainLayout } from '../pages/Main/Main';
import { DetailedView } from '../pages/DetailedView';
import Header from '../components/Header/Header';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const AppRouter = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={MainLayout} />
      <Route path="/view/:id" component={DetailedView} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
