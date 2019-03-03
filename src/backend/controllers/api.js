import differenceInSeconds from 'date-fns/difference_in_seconds';
import sortBy from 'sort-by';

import data from '../../shared/data/trips-1017';
import { getBysykkelStations } from '../services/bysykkel-api';

module.exports.getHighscore = function (req, res) {
  const {startStation, endStation} = req.body;
  const results = data.trips
    .filter((trip) => {
      return (
        trip.start_station_id == startStation &&
        trip.end_station_id == endStation
      );
    })
    .map((trip) => {
      return {
        date: trip.start_time,
        time:  differenceInSeconds(
          new Date(trip.end_time),
          new Date(trip.start_time),
        )
      }
    })
    .sort(sortBy('-time'))

  res.send(results);
}

module.exports.getDistance = function (req, res) {
  res.send({
    distance: 3215
  });
}

module.exports.getStations = async function (req, res) {
  const stations = await getBysykkelStations();
  res.send(stations);
}