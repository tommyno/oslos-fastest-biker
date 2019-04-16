import differenceInSeconds from 'date-fns/difference_in_seconds';
import sortBy from 'sort-by';

import tripData from '../../shared/data/trips-2019-04.json';

module.exports.getHighscore = function(req, res) {
  const { startStation, endStation } = req.body;

  const results = tripData

    // Filter out matching trips
    .filter(trip => {
      return trip.start_station_id == startStation && trip.end_station_id == endStation;
    })
    // Format data before return
    .map(trip => {
      return {
        date: trip.started_at,
        duration: trip.duration,
      };
    })
    .sort(sortBy('duration'));

  // Return top 10 results
  res.send(results.slice(0, 10));
};
