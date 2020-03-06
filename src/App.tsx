import React from 'react';
import Home from './components/Home';
import { Router } from '@reach/router';
import { PSQI, DASS, LEAFQ } from './components/Assessment';

const App = () => {
  return (
    <div>
      <Router>
        <Home path="/" />
        <PSQI path="/assessment/psqi" />
        <DASS path="/assessment/dass" />
        <LEAFQ path="/assessment/leafq" />
      </Router>
    </div>
  );
};

export default App;