import React from 'react';
import Home from './components/Home';
import { Router, Redirect, RouteComponentProps } from '@reach/router';
import { PSQI, DASS, LEAFQ } from './components/Assessment';
import Download from './components/Download';

const App = () => {
  return (
    <div>
      <Router>
        <NotFound default />
        <Home path="/*" />
        <PSQI path="/assessment/psqi" />
        <DASS path="/assessment/dass" />
        <LEAFQ path="/assessment/leafq" />
        <Download path="/download" />
      </Router>
    </div>
  );
};

const NotFound = (props: RouteComponentProps) => <Redirect to="/" />

export default App;