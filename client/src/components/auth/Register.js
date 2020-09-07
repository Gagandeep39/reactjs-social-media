import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alerts';
import { register } from '../../store/actions/auth';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

// Destructuring props to actual props
const Register = ({ setAlert, register, isAuthenticated, errors, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) setAlert('Password do not match', 'danger');
    else {
      console.log(formData);
      const newUser = {
        name,
        email,
        password,
      };
      register(newUser);
    }
  };

  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <div className='container m-4'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='display-4'> Sign Up</h4>
          <hr />
          <form className='form card-body' onSubmit={onSubmit}>
            <TextFieldGroup
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={onChange}
              error={errors.name}
            />
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
            <TextFieldGroup
              placeholder='Confirm Password'
              name='password2'
              type='password'
              value={password2}
              onChange={onChange}
              error={errors.password2}
            />
            <button class='btn btn-primary' type='submit'>
              {loading && (
                <span class='spinner-border spinner-border-sm'></span>
              )}{' '}
              Register
            </button>
            <hr />
            <p className='my-1'>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// Used for ensuring a prop is available
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { setAlert, register })(Register);
