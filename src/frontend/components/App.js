import React, { Component } from 'react';
import Select from 'react-select';
import sortBy from 'sort-by';
import { format } from 'date-fns';
import nb from 'date-fns/locale/nb';

import humanizeDuration from '../../shared/utils/humanize-duration';
import { getBysykkelStations, getHighscoreByStations } from '../services/backend-api';

import Map from './Map';
import HighScore from './HighScore';

import 'react-select/dist/react-select.css';

class App extends Component {
  state = {
    stations: [],
    startStation: null,
    endStation: null,
    highscoreResults: [],
    mapSettings: {
      selectedStation: null,
      zoomLevel: 12,
      center: ['10.7522', '59.9139'],
    },
  };

  async componentDidMount() {
    await this.getAllStations();
  }

  componentDidUpdate(prevProps, prevState) {
    this.handlePopulateHighscore(prevProps, prevState);
  }

  async handlePopulateHighscore(prevProps, prevState) {
    const { startStation, endStation } = this.state;

    const { startStation: prevStartStation, endStation: prevEndStation } = prevState;

    // Both stations should have a value
    if (!startStation || !endStation) {
      return;
    }

    // Start and stop can not be the same
    if (startStation === endStation) {
      return;
    }

    // Is there a change?
    if (startStation === prevStartStation && endStation === prevEndStation) {
      return;
    }

    const highscoreResults = await getHighscoreByStations(startStation, endStation);
    this.setState({ highscoreResults });
  }

  // Get all stations and sort by name
  async getAllStations() {
    const stations = await getBysykkelStations();
    if (stations) {
      this.setState({ stations });
    }
  }

  // Swap station A and B
  handleSwapClick = () => {
    const { startStation, endStation } = this.state;

    // Both stations should have a value
    if (!startStation || !endStation) {
      return;
    }

    // Start and stop can not be the same
    if (startStation === endStation) {
      return;
    }

    const prevStartStation = startStation;
    const prevEndStation = endStation;
    this.setState({
      startStation: prevEndStation,
      endStation: prevStartStation,
    });
  };

  // Handle marker click on map
  handleMapMarkerClick = id => {
    const { startStation, stations } = this.state;

    const selectedStation = stations.find(station => {
      return station.station_id === id;
    });

    const { lon, lat } = selectedStation;
    this.setState({
      mapSettings: { selectedStation: id, zoomLevel: 14, center: [lon, lat] },
    });

    if (startStation === null) {
      this.setState({ startStation: id });
    } else {
      this.setState({ endStation: id });
    }
  };

  render() {
    const { stations, startStation, endStation, highscoreResults } = this.state;

    const highscoreResultsElements = highscoreResults.map(function({ time, date }) {
      return (
        <li>
          {humanizeDuration(time)} ({format(new Date(date), 'DD. MMM YYYY', { locale: nb })})
        </li>
      );
    });

    // Make a formatted station list for dropdown select
    const stationOptions = stations
      .map(function({ name, station_id }) {
        return {
          value: station_id,
          label: name,
        };
      })
      .sort(sortBy('label'));

    return (
      <div className="wrap">
        <div className="col-50">
          <div className="settings">
            <h2>
              Oslos fastest biker!{' '}
              <span role="img" aria-label="Bicycle">
                🚲
              </span>
            </h2>
            Start:
            <br />
            <Select
              name="form-field-name"
              value={startStation}
              onChange={option => option && this.setState({ startStation: option.value })}
              options={stationOptions}
            />
            <br />
            <button onClick={this.handleSwapClick}>Swap stations</button>
            <br />
            <br />
            Stop:
            <br />
            <Select
              name="form-field-name"
              value={endStation}
              onChange={option => option && this.setState({ endStation: option.value })}
              options={stationOptions}
            />
            <h3>Distance</h3>
            <p>0,46 km</p>
            <HighScore />
            <ul>resultselements {highscoreResultsElements}</ul>
            <h3>
              All time fastest average{' '}
              <span role="img" aria-label="Lightning">
                ⚡
              </span>
            </h3>
            <ul>
              <li>
                37 km/h (Spikersuppa → Bygdøy, 22. mars 2017){' '}
                <span role="img" aria-label="Police">
                  🚨🚔👮
                </span>
              </li>
              <li>24 km/h (Botanisk hage → Stortinget, 28. mars 2017</li>
            </ul>
          </div>
        </div>
        <div className="col-50">
          <Map
            stations={this.state.stations}
            mapSettings={this.state.mapSettings}
            handleMapMarkerClick={this.handleMapMarkerClick}
          />
        </div>
      </div>
    );
  }
}

export default App;
