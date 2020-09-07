import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../store/actions/profile';
import { connect } from 'react-redux';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td> {edu.school} </td>
      <td className='hide-sm'> {edu.degree} </td>
      <td>
        <Moment format='YYYY-MM-DD'>{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format='YYYY-MM-DD'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => deleteEducation(edu._id)}
        >
          Delete{' '}
        </button>
      </td>
    </tr>
  ));

  return (
    <div className='card my-2'>
      <div className='card-body'>
        <h4 className='display-4'>Education</h4>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>School</th>
              <th className='hide-sm'>Degree</th>
              <th className='hide-sm'>Years</th>
              <th className='hide-sm'>Action</th>
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </div>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
