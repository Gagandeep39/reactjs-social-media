import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../store/actions/auth';
import TextFieldGroup from '../common/TextFieldGroup';

const Login = ({ login, isAuthenticated, errors, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <div className='container m-4'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='display-4'>Sign in</h4>
          <hr />
          <form className='form card-body' onSubmit={onSubmit}>
            <TextFieldGroup
              placeholder='Email Address'
              name='email'
              type='email'
              value={email}
              onChange={(e) => onChange(e)}
              error={errors.email}
            />
            <TextFieldGroup
              placeholder='Password'
              name='password'
              type='password'
              value={password}
              onChange={onChange}
              error={errors.password}
            />
            <button class='btn btn-primary' type='submit'>
              {loading && (
                <span class='spinner-border spinner-border-sm'></span>
              )}{' '}
              Login
            </button>
            <hr />
            <p>
              Create an account? <Link to='/register'>Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.error,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { login })(Login);
