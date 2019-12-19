import React from 'react'
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './pages/Login/Login.page';
import Home from './pages/Home/Home.page';
import Reservation from './pages/Reservation/Reservation.page';
import Topnav from './components/Topnav/Topnav.components';
import './App.css';
import Registration from './pages/Registration/Registration.page';

const history = createBrowserHistory();

function App() {
  return (
    <div>
      <div className="topnav-container">
          <Topnav />
      </div>
      <div className="page">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reservation" component={Reservation} />
            <Route exact path="/registration" component={Registration} />
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App;
