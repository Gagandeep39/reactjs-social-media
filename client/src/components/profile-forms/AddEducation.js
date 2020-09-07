import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../store/actions/profile';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

function AddEducation({ addEducation, history, errors }) {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const [dateDisabled, setDateDisabled] = useState(false);

  const changeHandler = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const submitHandler = (event) => {
    event.preventDefault();
    addEducation(formData, history);
  };

  return (
    <div className='container m-4'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='display-4'> Add your education</h4>
          <hr />
          <form className='form' onSubmit={submitHandler}>
            <p className='lead'>
              <i className='fas fa-graduation-cap'></i> Add any school,
              bootcamp, etc that you have attended
            </p>
            <TextFieldGroup
              type='text'
              placeholder='* School or Bootcamp'
              name='school'
              required
              value={school}
              onChange={changeHandler}
              error={errors.school}
            />
            <TextFieldGroup
              type='text'
              placeholder='* Degree or Certificate'
              name='degree'
              required
              value={degree}
              onChange={changeHandler}
              error={errors.degree}
            />
            <TextFieldGroup
              type='text'
              placeholder='Field Of Study'
              name='fieldofstudy'
              onChange={changeHandler}
              value={fieldofstudy}
              error={errors.fieldofstudy}
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
                  value={current}
                  checked={current}
                  onChange={() => {
                    setFormData({ ...formData, current: !current });
                    setDateDisabled(!dateDisabled);
                  }}
                />{' '}
                Current School or Bootcamp
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
              placeholder='Program Description'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.error,
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
