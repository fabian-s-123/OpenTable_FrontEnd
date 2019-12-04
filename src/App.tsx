import React, { Component } from 'react'
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './pages/Login/Login.page';
import Home from './pages/Home/Home.page';
import Reservation from './pages/Reservation/Reservation.page';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/reservation" component={Reservation} />
      </Switch>
    </Router>
  )
}

export default App;
