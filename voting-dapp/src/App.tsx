import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import VotingUser from './Component/voting-user-login';

function App() {
  return (
    <Router>
      <div className="App">
        <VotingUser />
      </div>
    </Router>
  );
}

export default App;
