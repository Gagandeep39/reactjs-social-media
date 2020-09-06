import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alerts';
import { register } from '../../store/actions/auth';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

// Destructuring props to actual props
const Register = ({ setAlert, register, isAuthenticated, errors }) => {
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
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
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
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

// Used for ensuring a prop is available
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.error,
  };
};

export default connect(mapStateToProps, { setAlert, register })(Register);
