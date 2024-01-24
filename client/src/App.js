import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Home from './components/Home';
import ipConfig from "./ipConfig.json";
import { Provider } from 'react-redux';
import store from './redux/store';

export const config = {
  endpoint: `http://${ipConfig.backend}/api`,
  githubIp: `https://api.github.com/users`
};

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
