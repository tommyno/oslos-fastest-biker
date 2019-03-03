const axios = require('axios');
const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

const backendApi = axios.create({
  baseURL: apiUrl,
});

export async function getBysykkelStations () {
  const {data} = await backendApi.get('/stations');
  return data;
}

export async function getHighscoreByStations (startStation, endStation) {
  const {data} = await backendApi.post('/highscore', {
    startStation,
    endStation
  });
  return data;
}