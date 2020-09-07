import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepositories } from '../../store/actions/profile';
import Spinner from '../layouts/Spinner';

function ProfileGithub({ username, getGithubRepositories, repos }) {
  useEffect(() => {
    getGithubRepositories(username);
  }, [getGithubRepositories, username]);

  return (
    <div class='card mt-2'>
      <h2 class='card-header'>
        <i class='fab fa-github'></i> Github Repos
      </h2>
      <div className='list-group list-group-flush'>
        {repos === null ? (
          <Spinner />
        ) : (
          repos.map((repo) => (
            <div key={repo.id} class='list-group-item'>
              <div>
                <h3 className='lead'>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {repo.name}
                  </a>
                  <span style={{ float: 'right' }}>
                    <span class='badge badge-primary ml-2'>
                      Stars: {repo.stargazers_count}{' '}
                    </span>
                    <span class='badge badge-dark ml-2'>
                      Watchers: {repo.watchers_count}{' '}
                    </span>
                    <span class='badge badge-light ml-2'>
                      Forks: {repo.forks_count}{' '}
                    </span>
                  </span>
                </h3>
                <p>{repo.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

ProfileGithub.propTypes = {
  getGithubRepositories: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepositories })(
  ProfileGithub
);
