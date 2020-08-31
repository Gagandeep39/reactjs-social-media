import React, { Fragment } from 'react';
import spinner from '../../assets/spinner.gif';

export default () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ margin: 'auto', display: 'block', width: '200px' }}
        alt='Loading...'
      />
    </Fragment>
  );
};
