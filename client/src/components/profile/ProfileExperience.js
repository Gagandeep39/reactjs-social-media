import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, current, from, to, description, title },
}) => {
  return (
    <div className='card' style={{ borderRadius: '0px' }}>
      <div className='card-body'>
        <h3 className='card-title'>{company} </h3>
        <hr />
        <p>
          <Moment format='DD-MM-YYYY'>{from}</Moment> -{' '}
          {current ? 'Current' : <Moment format='DD-MM-YYYY'>{to}</Moment>}
        </p>
        <p>
          <strong>Position: </strong>
          {title}
          <br />
          <strong>Description: </strong> {description}
        </p>
      </div>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
