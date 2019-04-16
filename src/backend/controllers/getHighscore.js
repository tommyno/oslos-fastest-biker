import differenceInSeconds from 'date-fns/difference_in_seconds';
import sortBy from 'sort-by';

import tripData from '../../shared/data/04.json';

module.exports.getHighscore = function(req, res) {
  const { stationStart, stationEnd } = req.body;

  const results = tripData

    // Filter out matching trips
    .filter(trip => {
      return trip.start_station_id === stationStart && trip.end_station_id === stationEnd;
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
