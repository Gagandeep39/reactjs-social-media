import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../store/actions/profile';
import Spinner from '../layouts/Spinner';

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
          <Link to='/profiles' className='btn btn-light'>
            Back
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link className='btn btn-dark'>Edit Profile</Link>
            )}
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
