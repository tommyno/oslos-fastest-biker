const axios = require('axios');
const bysykkelClientId = process.env.BYSYKKEL_API_CLIENT_ID;
const bysykkelApiUrl = process.env.BYSYKKEL_API_URL;

const bysykkelApi = axios.create({
  baseURL: bysykkelApiUrl,
  headers: {'Client-Identifier': bysykkelClientId}
});

module.exports.getBysykkelStations = async function () {
  const {data} = await bysykkelApi.get('/stations');
  return data.stations;
}