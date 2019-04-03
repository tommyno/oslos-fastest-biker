import differenceInSeconds from 'date-fns/difference_in_seconds';
import sortBy from 'sort-by';

import data from '../../shared/data/trips-1018';

module.exports.getHighscore = function(req, res) {
  const { startStation, endStation } = req.body;
  console.log('data trips:', data.trips);
  console.log('startStation:', startStation, ' - endStation:', endStation);
  const results = data.trips
    .filter(trip => {
      return trip.start_station_id == startStation && trip.end_station_id == endStation;
    })
    .map(trip => {
      return {
        date: trip.start_time,
        time: differenceInSeconds(new Date(trip.end_time), new Date(trip.start_time)),
      };
    })
    .sort(sortBy('-time'));

  res.send(results);
};
