import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td> {exp.company} </td>
      <td className='hide-sm'> {exp.title} </td>
      <td>
        <Moment format='YYYY-MM-DD'>{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          'Now'
        ) : (
          <Moment format='YYYY-MM-DD'>{exp.to}</Moment>
        )}
      </td>
      <td className='btn btn-danger'>Delete</td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Work Experience</h2>
      <table className='table'>
        <thead>
          <th>Company</th>
          <th className='hide-sm'>Title</th>
          <th className='hide-sm'>Years</th>
          <th className='hide-sm'>Action</th>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default Experience;
