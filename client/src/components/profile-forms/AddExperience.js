import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../store/actions/profile';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

function AddExperience({ addExperience, history, errors }) {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { company, title, location, from, to, current, description } = formData;

  const [dateDisabled, setDateDisabled] = useState(false);

  const changeHandler = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const submitHandler = (event) => {
    event.preventDefault();
    addExperience(formData, history);
  };

  return (
    <div className='container m-4'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='display-4'> Add an experience</h4>
          <hr />
          <form className='form' onSubmit={submitHandler}>
            <p className='lead'>
              <i className='fas fa-code-branch'></i> Add any
              developer/programming positions that you have had in the past
            </p>
            <TextFieldGroup
              type='text'
              placeholder='* Job Title'
              name='title'
              value={title}
              onChange={changeHandler}
              error={errors.title}
            />
            <TextFieldGroup
              type='text'
              placeholder='* Company'
              name='company'
              value={company}
              onChange={changeHandler}
              error={errors.company}
            />
            <TextFieldGroup
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={changeHandler}
              error={errors.location}
            />
            <h4>From Date</h4>
            <TextFieldGroup
              type='date'
              name='from'
              onChange={changeHandler}
              value={from}
              error={errors.from}
            />
            <div className='form-group'>
              <p>
                <input
                  type='checkbox'
                  name='current'
                  checked={current}
                  value={current}
                  onChange={() => {
                    setFormData({ ...formData, current: !current });
                    setDateDisabled(!dateDisabled);
                  }}
                />{' '}
                Current Job
              </p>
            </div>
            <h4>To Date</h4>
            <TextFieldGroup
              type='date'
              name='to'
              disabled={dateDisabled}
              onChange={changeHandler}
              value={to}
              error={errors.to}
            />
            <TextAreaFieldGroup
              value={description}
              onChange={changeHandler}
              placeholder='Job Description'
              name='description'
              error={errors.description}
              info='Tell us a little about yourself'
            />
            <input type='submit' className='btn btn-primary my-1' />
            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.error,
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
