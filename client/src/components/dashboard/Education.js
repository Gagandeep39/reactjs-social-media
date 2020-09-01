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
      <td className='btn btn-danger' onClick={() => deleteEducation(edu._id)}>Delete</td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education</h2>
      <table className='table'>
        <thead>
          <th>School</th>
          <th className='hide-sm'>Degree</th>
          <th className='hide-sm'>Years</th>
          <th className='hide-sm'>Action</th>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
