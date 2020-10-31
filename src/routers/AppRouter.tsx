import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Local Imports
import { CatalogueApp } from '../pages/Main/DeveloperCatalogue';
import { DetailedView } from '../components/DetailedView';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import Header from '../components/Header/Header';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={CatalogueApp} />
      <Route path="/view/:id" component={DetailedView} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
