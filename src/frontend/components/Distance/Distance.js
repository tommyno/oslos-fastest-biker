import React from 'react';

import humanizeDistance from '../../../shared/utils/humanize-distance';

import './Distance.scss';

const Distance = ({ distance }) => {
  return (
    <div>
      <h3>Distance</h3>
      <p>{humanizeDistance(distance)}</p>
    </div>
  );
};

export default Distance;
