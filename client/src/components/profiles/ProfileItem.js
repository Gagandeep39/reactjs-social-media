import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { name, avatar, _id },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='container-fluid mt-3'>
      <div className='card flex-row flex-wrap'>
        <div>
          <img src={avatar} alt='' className='round-img' />
        </div>
        <div className='card-body' style={{ padding: '0px' }}>
          <h4 className='card-title m-2'> {name} </h4>
          <hr />
          <div className='row m-2'>
            <p className='card-text col-6'>
              {status} {company && <span>at {company}</span>}
              <br />
              {location && (
                <span>
                  {' '}
                  <i class='fas fa-map-marker-alt'></i> {location}
                </span>
              )}
              <br />
            </p>
            <ul className='col-3' style={{ float: 'right' }}>
              {skills.slice(0, 4).map((skill, index) => (
                <li key={index} className='text-primary'>
                  <i className='fas fa-check'></i> {skill}
                </li>
              ))}
            </ul>
            <div className='col-3'>
              <Link to={`/profile/${_id}`} className='btn btn-primary'>
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
