import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, description, current },
}) => {
  return (
    <div className='card' style={{ borderRadius: '0px' }}>
      <div className='card-body'>
        <h3 className='card-title'>{school} </h3>
        <hr />
        <p>
          <Moment format='DD-MM-YYYY'>{from}</Moment> -{' '}
          {current ? 'Current' : <Moment format='DD-MM-YYYY'>{to}</Moment>}
        </p>
        <p>
          <strong>Degree: </strong>
          {degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {fieldofstudy}
          <br />
          <strong>Description: </strong> {description}
        </p>
      </div>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
