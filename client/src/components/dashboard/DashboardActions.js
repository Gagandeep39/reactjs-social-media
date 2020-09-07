import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='btn-group'>
      <Link className='btn btn-outline-secondary' to='/edit-profile'>
        <i className='fas fa-user-circle'></i> Edit Profile
      </Link>
      <Link className='btn btn-outline-secondary' to='/add-experience'>
        <i className='fab fa-black-tie'></i> Add Experience
      </Link>
      <Link className='btn btn-outline-secondary' to='/add-education'>
        <i className='fas fa-graduation-cap'></i> Add education
      </Link>
    </div>
  );
};

export default DashboardActions;
