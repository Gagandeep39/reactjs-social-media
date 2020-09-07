import React from 'react';
import PropTypes from 'prop-types';

function ProfileTop({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) {
  return (
    <div class='row mx-0'>
      <div class='card w-100'>
        <div class='card-body'>
          <div class='row'>
            <div class='col-12 col-lg-8 col-md-6'>
              <h3 class='mb-0 text-truncated'> {name} </h3>
              <p class='lead'>
                {' '}
                {status} {company && <span>at {company} </span>}{' '}
              </p>
              <p>
              <span>
                  {' '}
                  <i class='fas fa-map-marker-alt'></i> {location}
                </span>

              </p>
              <div class='social-input'>
                {website && (
                  <a href={website} target='_blank' rel='noopener noreferrer'>
                    <i class='fas fa-globe fa-2x'></i>
                  </a>
                )}
                {social && social.facebook && (
                  <a
                    href={social.facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i class='fab fa-facebook fa-2x'></i>
                  </a>
                )}
                {social && social.twitter && (
                  <a
                    href={social.twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i class='fab fa-twitter fa-2x'></i>
                  </a>
                )}
                {social && social.linkedin && (
                  <a
                    href={social.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i class='fab fa-linkedin fa-2x'></i>
                  </a>
                )}
                {social && social.youtube && (
                  <a
                    href={social.youtube}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i class='fab fa-youtube fa-2x'></i>
                  </a>
                )}
                {social && social.instagram && (
                  <a
                    href={social.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i class='fab fa-instagram fa-2x'></i>
                  </a>
                )}
              </div>

              
            </div>
            <div class='col-12 col-lg-4 col-md-6 text-center'>
              <img
                src={avatar}
                alt=''
                class='mx-auto rounded-circle img-fluid'
              />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
