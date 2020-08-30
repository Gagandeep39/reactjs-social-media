import React, { Fragment, useEffect } from 'react';
import './App.css';
import { Navbar } from './components/layouts/Navbar';
import { Landing } from './components/layouts/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layouts/Alert';
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) setAuthToken(localStorage.token);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment className='App'>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            {/* Works like switch case and nly renders th first matching path */}
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
