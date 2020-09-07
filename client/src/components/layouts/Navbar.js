import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul className='navbar-nav justify-content-end ml-auto'>
      <li>
        <NavLink activeClassName='active-nav' to='/profiles'>Developers</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active-nav' to='/posts'>Posts</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active-nav' to='/dashboard'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink onClick={logout} to='/'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </NavLink>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className='navbar-nav justify-content-end ml-auto'>
      <li>
        <NavLink activeClassName='active-nav' onClick={logout} to='/profiles'>
          Developers
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active-nav' to='/register'>Register</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active-nav' to='/login'>Login</NavLink>
      </li>
    </ul>
  );
  return (
    <nav class='navbar navbar-expand-sm bg-dark navbar-dark sticky-top'>
      <NavLink className='navbar-brand' to='/'>
        <i className='fas fa-code'></i> DevConnector
      </NavLink>
      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { logout })(Navbar);
