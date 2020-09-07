import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function ProfileAbout({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) {
  return (
    <div class='card mt-2'>
      <div className='card-body'>
      {bio && (
        <Fragment>
          <h3 class='card-title'>{name.trim().split(' ')[0]}'s Bio</h3>
          <p>{bio}</p>
        </Fragment>
      )}
      <hr />
      <h3 class='card-text'>Skill Set</h3><div class='skills'>
        {skills.map((skill, index) => (
          <div key={index} class='lead'>
            {/* <i class='fa fa-check'></i>  */}
                <span class='badge badge-info tags'> {skill} </span>
          </div>
        ))}
      </div>
      </div>
      
    </div>
  );
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
