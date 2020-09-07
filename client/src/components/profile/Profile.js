import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../store/actions/profile';
import Spinner from '../layouts/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

function Profile({
  match,
  getProfileById,
  auth,
  profile: { profile, loading },
}) {
  // match -> props.match.params.id
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-outline-secondary my-1'>
            Back
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link className='btn btn-outline-primary ml-1'>Edit Profile</Link>
            )}
          <div class='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='row'>
              <div className='col'>
                <h2 className='card card-header mt-2'>Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((experience, index) => (
                      <ProfileExperience key={index} experience={experience} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No Experience</h4>
                )}
              </div>
              <div class='col'>
                <h3 className='card card-header mt-2'> Education</h3>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((edu, index) => (
                      <ProfileEducation key={index} education={edu} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No Education</h4>
                )}
              </div>
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
