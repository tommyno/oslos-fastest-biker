const axios = require('axios');
const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

const backendApi = axios.create({
  baseURL: apiUrl,
});

export async function getBysykkelStations() {
  const { data } = await backendApi.get('/stations');
  return data;
}

export async function getHighscoreByStations(stationStart, stationEnd) {
  const { data } = await backendApi.post('/highscore', {
    stationStart,
    stationEnd,
  });
  return data;
}

export async function getDistance(stationStart, stationEnd) {
  const { data } = await backendApi.post('/distance', {
    stationStart,
    stationEnd,
  });
  return data;
}
