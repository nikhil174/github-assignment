import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ipConfig from "./ipConfig.json";
import { Provider } from 'react-redux';
import store from './redux/store';
import UserDetails from './components/UserDetails';
import RepositoryDetails from './components/RepoDetails';
import Followers from './components/Followers';
import './App.css';

export const config = {
  endpoint: `http://${ipConfig.backend}/api`,
  githubIp: `https://api.github.com/users`
};

function App() {
  return (
    <Provider store={store}>
      <div className='app-container'>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:username" element={<UserDetails />} />
            <Route path="/repository/:repoName" element={<RepositoryDetails />} />
            <Route path="/user/:username/followers" element={<Followers />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
