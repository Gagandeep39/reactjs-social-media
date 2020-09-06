import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../store/actions/auth';
import TextFieldGroup from '../common/TextFieldGroup';

const Login = ({ login, isAuthenticated, errors }) => {
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
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
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
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/register'>Register</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.error,
  };
};

export default connect(mapStateToProps, { login })(Login);
