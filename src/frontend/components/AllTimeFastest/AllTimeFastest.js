import React from 'react';

import './AllTimeFastest.scss';

const AllTimeFastest = () => {
  return (
    <div>
      <h3>
        All time fastest average{' '}
        <span role="img" aria-label="Lightning">
          ⚡
        </span>
      </h3>
      <ul>
        <li>
          37 km/h (Spikersuppa → Bygdøy, 22. mars 2017){' '}
          <span role="img" aria-label="Police">
            🚨🚔👮
          </span>
        </li>
        <li>24 km/h (Botanisk hage → Stortinget, 28. mars 2017</li>
      </ul>
    </div>
  );
};

export default AllTimeFastest;
