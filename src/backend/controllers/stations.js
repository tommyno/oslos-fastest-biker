const axios = require('axios');
const bysykkelApiUrl = process.env.BYSYKKEL_API_URL;

module.exports.getStations = async function(req, res) {
  const { data } = await axios.get(bysykkelApiUrl);
  const stations = data.data.stations;

  res.send(stations);
};
