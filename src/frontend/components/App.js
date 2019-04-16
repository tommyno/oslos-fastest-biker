import React, { Component } from 'react';
import Select from 'react-select';
import sortBy from 'sort-by';
import { getBysykkelStations, getHighscoreByStations, getDistance } from '../services/backend-api';

import Map from './Map';
import HighScore from './HighScore';
import Distance from './Distance';

import 'react-select/dist/react-select.css';

class App extends Component {
  state = {
    stations: [],
    stationStart: null,
    stationEnd: null,
    distance: null,
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
    this.handleCalculateDistance(prevProps, prevState);
  }

  async handlePopulateHighscore(prevProps, prevState) {
    const { stationStart, stationEnd } = this.state;

    const { stationStart: prevstationStart, stationEnd: prevstationEnd } = prevState;

    // Both stations should have a value
    if (!stationStart || !stationEnd) {
      return;
    }

    // Start and stop can not be the same
    if (stationStart === stationEnd) {
      return;
    }

    // Is there a change?
    if (stationStart === prevstationStart && stationEnd === prevstationEnd) {
      return;
    }

    const highscoreResults = await getHighscoreByStations(stationStart, stationEnd);
    this.setState({ highscoreResults });
  }

  async handleCalculateDistance(prevProps, prevState) {
    const { stationStart, stationEnd, stations } = this.state;

    const { stationStart: prevstationStart, stationEnd: prevstationEnd } = prevState;

    // Both stations should have a value
    if (!stationStart || !stationEnd) {
      return;
    }

    // Start and stop can not be the same
    if (stationStart === stationEnd) {
      return;
    }

    // Is there a change?
    if (stationStart === prevstationStart && stationEnd === prevstationEnd) {
      return;
    }

    // Get full station info for needed coordinates
    const stationA = stations.find(station => station.station_id === stationStart);
    const stationB = stations.find(station => station.station_id === stationEnd);

    const { distance } = await getDistance(stationA, stationB);
    this.setState({ distance });
  }

  // Get all stations
  async getAllStations() {
    const stations = await getBysykkelStations();
    if (stations) {
      this.setState({ stations });
    }
  }

  // Swap station A and B
  handleSwapClick = () => {
    const { stationStart, stationEnd } = this.state;

    // Both stations should have a value
    if (!stationStart || !stationEnd) {
      return;
    }

    // Start and stop can not be the same
    if (stationStart === stationEnd) {
      return;
    }

    const prevstationStart = stationStart;
    const prevstationEnd = stationEnd;
    this.setState({
      stationStart: prevstationEnd,
      stationEnd: prevstationStart,
    });
  };

  // Handle marker click on map
  handleMapMarkerClick = id => {
    const { stationStart, stations } = this.state;

    const selectedStation = stations.find(({ station_id }) => {
      return station_id === id;
    });

    const { lon, lat } = selectedStation;
    this.setState({
      mapSettings: { selectedStation: id, zoomLevel: 14, center: [lon, lat] },
    });

    if (stationStart === null) {
      this.setState({ stationStart: id });
    } else {
      this.setState({ stationEnd: id });
    }
  };

  render() {
    const { stations, stationStart, stationEnd, highscoreResults, distance } = this.state;

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
              value={stationStart}
              onChange={option => option && this.setState({ stationStart: option.value })}
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
              value={stationEnd}
              onChange={option => option && this.setState({ stationEnd: option.value })}
              options={stationOptions}
            />
            {distance && <Distance distance={distance} />}
            {stationStart && stationEnd && <HighScore results={highscoreResults} distance={distance} />}
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
