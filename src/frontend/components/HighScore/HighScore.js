import React from 'react';
import { format } from 'date-fns';
import nb from 'date-fns/locale/nb';

import humanizeDuration from '../../../shared/utils/humanize-duration';
import averageSpeed from '../../../shared/utils/average-speed';

import './HighScore.scss';

const HighScore = ({ results, distance }) => {
  function Results() {
    if (!results.length) {
      return <p>Ingen turer til nå. Hva venter du på? ;)</p>;
    }

    const list = results.map(function({ duration, date }, index) {
      return (
        <li key={index}>
          {humanizeDuration(duration)} ({format(new Date(date), 'DD. MMM YYYY', { locale: nb })}){' '}
          {averageSpeed(distance, duration)}
        </li>
      );
    });

    return <ol>{list}</ol>;
  }

  return (
    <div className="high-score-board">
      <h2 className="high-score-board__header">High score</h2>
      <Results />
    </div>
  );
};

export default HighScore;
