import React from 'react';
import Home from './components/Home';
import { Router } from '@reach/router';
import { PSQI, DASS, LEAFQ } from './components/Assessment';
import useLocalStorage from '@rehooks/local-storage';

const App = () => {
  return (
    <Router>
      <Home path="/" />
      <PSQI path="/assessment/psqi" />
      <DASS path="/assessment/dass" />
      <LEAFQ path="/assessment/leafq" />
    </Router>
  );
};

export default App;