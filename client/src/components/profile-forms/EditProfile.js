import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  createOrUpdateProfile,
  getCurrentProfile,
} from '../../store/actions/profile';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';

const EditProfile = ({
  profile: { profile, loading },
  createOrUpdateProfile,
  history,
  getCurrentProfile,
  errors,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [getCurrentProfile, loading]);

  // Select options for status
  const options = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or Learning', value: 'Student or Learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' },
  ];

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    createOrUpdateProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Update Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit}>
        <SelectListGroup
          placeholder='Status'
          name='status'
          value={status}
          onChange={onChange}
          options={options}
          error={errors.status}
          info='Give us an idea of where you are at in your career'
        />
        <TextFieldGroup
          type='text'
          placeholder='Company'
          name='company'
          onChange={onChange}
          value={company}
          error={errors.company}
          info='Could be your own company or one you work for'
        />
        <TextFieldGroup
          type='text'
          placeholder='Website'
          name='website'
          onChange={onChange}
          value={website}
          error={errors.website}
          info='Could be your own or a company website'
        />
        <TextFieldGroup
          type='text'
          placeholder='Location'
          name='location'
          onChange={(e) => onChange(e)}
          value={location}
          error={errors.location}
          info='City & state suggested (eg. Boston, MA)'
        />
        <TextFieldGroup
          type='text'
          placeholder='* Skills'
          name='skills'
          onChange={onChange}
          value={skills}
          error={errors.skills}
          info='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'
        />
        <TextFieldGroup
          type='text'
          placeholder='Github Username'
          name='githubusername'
          onChange={onChange}
          value={githubusername}
          error={errors.githubusername}
          info='If you want your latest repos and a Github link, include your
          username'
        />
        <TextAreaFieldGroup
          placeholder='A short bio of yourself'
          name='bio'
          onChange={onChange}
          value={bio}
          error={errors.bio}
          info='Tell us a little about yourself'
        />

        <div className='my-2'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => setDisplaySocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs ? (
          <Fragment>
            <InputGroup
              placeholder='Twitter Profile URL'
              name='twitter'
              icon='fab fa-twitter'
              onChange={onChange}
              value={twitter}
              error={errors.twitter}
            />
            <InputGroup
              type='text'
              placeholder='Facebook URL'
              name='facebook'
              onChange={onChange}
              value={facebook}
              icon='fab fa-facebook'
              error={errors.facebook}
            />
            <InputGroup
              type='text'
              placeholder='YouTube URL'
              name='youtube'
              onChange={onChange}
              value={youtube}
              icon='fab fa-youtube'
              error={errors.youtube}
            />

            <InputGroup
              type='text'
              placeholder='Linkedin URL'
              name='linkedin'
              onChange={onChange}
              value={linkedin}
              icon='fab fa-linkedin'
              error={errors.linkedin}
            />
            <InputGroup
              type='text'
              placeholder='Instagram URL'
              name='instagram'
              onChange={onChange}
              value={instagram}
              icon='fab fa-instagram'
              error={errors.instagram}
            />
          </Fragment>
        ) : null}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createOrUpdateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.error,
});

// with router is used to pass history bject to other component(ere it will be passed to createOrUpdate profile)
export default connect(mapStateToProps, {
  createOrUpdateProfile,
  getCurrentProfile,
})(withRouter(EditProfile));
