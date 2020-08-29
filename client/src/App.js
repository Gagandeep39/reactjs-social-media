import React, { Fragment } from 'react';
import './App.css';
import { Navbar } from './components/layouts/Navbar';
import { Landing } from './components/layouts/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';

function App() {
  return (
    <Router>
      <Fragment className='App'>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          {/* Works like switch case and nly renders th first matching path */}
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
