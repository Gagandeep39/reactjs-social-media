import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, current, from, to, description, title },
}) => {
  return (
    <div>
      <h3 class='text-dark'>{company} </h3>
      <p>
        <Moment format='DD-MM-YYYY'>{from}</Moment> -{' '}
        {current ? 'Current' : <Moment format='DD-MM-YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
