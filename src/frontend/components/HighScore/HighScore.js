import React from 'react';
import './HighScore.scss';

const HighScore = props => {
  return (
    <div className="high-score-board">
      <h2 className="high-score-board__header">High score</h2>
      <ol>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ol>
    </div>
  );
};

export default HighScore;
