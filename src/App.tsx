import React from 'react';
import Home from './components/Home';
import { Router } from '@reach/router';
import { PSQI, DASS, LEAFQ } from './components/Assessment';
import Download from './components/Download';

const App = () => {
  return (
    <div>
      <Router>
        <Home path="/*" />
        <PSQI path="/assessment/psqi" />
        <DASS path="/assessment/dass" />
        <LEAFQ path="/assessment/leafq" />
        <Download path="/download" />
      </Router>
    </div>
  );
};

export default App;