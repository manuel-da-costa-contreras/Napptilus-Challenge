import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Local Imports
import { CatalogueApp } from '../pages/Main/DeveloperCatalogue';
import { DetailedView } from '../components/DetailedView';
import Header from '../components/Header/Header';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';

const AppRouter = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={CatalogueApp} />
      <Route path="/view/:id" component={DetailedView} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
