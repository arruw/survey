import React from 'react';
import Home from './components/Home';
import { Router, Redirect, RouteComponentProps } from '@reach/router';
import Download from './components/Download';
import Assessment from './components/Assessment';

const App = () => {
  return (
    <div>
      <Router>
        <NotFound default />
        <Home path="/*" />
        <Assessment path="/assessment/:surveyId" />
        <Download path="/download" />
      </Router>
    </div>
  );
};

const NotFound = (props: RouteComponentProps) => <Redirect to="/" />

export default App;