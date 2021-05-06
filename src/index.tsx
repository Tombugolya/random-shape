import React from 'react';
import Main from './components/Main';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
