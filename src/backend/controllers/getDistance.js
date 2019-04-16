const axios = require('axios');
const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

module.exports.getDistance = async function(req, res) {
  const { stationStart, stationEnd } = req.body;

  // Format coordinates
  const coordinates = `${stationStart.lon},${stationStart.lat};${stationEnd.lon},${stationEnd.lat}`;

  // Prepare GET query
  const query = `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}.json?access_token=${mapboxToken}`;

  // Fetch data
  const { data } = await axios.get(query);

  // We only need the distance
  const distance = data.routes[0].distance;

  res.send({
    distance,
  });
};
