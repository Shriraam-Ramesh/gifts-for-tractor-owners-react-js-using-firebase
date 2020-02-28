import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from './components/login/LoginPage';
import RoutingPage from './components/RoutingPage';
import ErrorPage from './components/ErrorPage';
function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/ErrorPage" exact component={ErrorPage} />
            <RoutingPage/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
