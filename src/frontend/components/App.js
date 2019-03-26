import React, { Component } from 'react';
import Select from 'react-select';
import sortBy from 'sort-by';
import { format } from 'date-fns';
import nb from 'date-fns/locale/nb';

import humanizeDuration from '../../shared/utils/humanize-duration';
import './App.css';
import Map from './Map';
import 'react-select/dist/react-select.css';
import { getBysykkelStations, getHighscoreByStations } from '../services/backend-api';

class App extends Component {
  state = {
    stations: [],
    stationOptions: [],
    selectedStartStation: null,
    selectedEndStation: null,
    highscoreResults: [],
  };

  async componentDidMount() {
    await this.getAllStations();
    this.handlePopulateStationOptions();
  }

  componentDidUpdate(prevProps, prevState) {
    this.handlePopulateHighscore(prevProps, prevState);
  }

  async handlePopulateHighscore(prevProps, prevState) {
    const { selectedStartStation, selectedEndStation } = this.state;

    const { selectedStartStation: prevSelectedStartStation, selectedEndStation: prevSelectedEndStation } = prevState;

    // Both stations should have a value
    if (!selectedEndStation || !selectedEndStation) {
      return;
    }

    // Start and stop can not be the same
    if (selectedStartStation === selectedEndStation) {
      return;
    }

    // Is there a change?
    if (selectedStartStation === prevSelectedStartStation && selectedEndStation === prevSelectedEndStation) {
      return;
    }

    console.log(Date.now() + ' changed');

    const highscoreResults = await getHighscoreByStations(selectedStartStation, selectedEndStation);
    this.setState({ highscoreResults });
  }

  // Get all stations
  async getAllStations() {
    const stations = await getBysykkelStations();
    this.setState({ stations });
  }

  // Show stations in dropdown
  handlePopulateStationOptions() {
    const stations = this.state.stations;
    const stationOptions = stations
      .map(function(station) {
        return {
          value: station.id,
          label: `${station.title} (${station.subtitle})`,
        };
      })
      .sort(sortBy('label'));
    this.setState({ stationOptions });
  }

  // Swap station A and B
  handleSwapClick = () => {
    const { selectedStartStation, selectedEndStation } = this.state;

    // Both stations should have a value
    if (!selectedEndStation || !selectedEndStation) {
      return;
    }

    // Start and stop can not be the same
    if (selectedStartStation === selectedEndStation) {
      return;
    }

    const prevSelectedStartStation = selectedStartStation;
    const prevSelectedEndStation = selectedEndStation;
    this.setState({
      selectedStartStation: prevSelectedEndStation,
      selectedEndStation: prevSelectedStartStation,
    });
  };

  render() {
    const { stationOptions, selectedStartStation, selectedEndStation, highscoreResults } = this.state;

    const highscoreResultsElements = highscoreResults.map(function({ time, date }) {
      return (
        <li>
          {humanizeDuration(time)} ({format(new Date(date), 'DD. MMM YYYY', { locale: nb })})
        </li>
      );
    });

    return (
      <div className="wrap">
        <div className="col-50">
          <div className="settings">
            <h2>
              Oslo bysykkel API{' '}
              <span role="img" aria-label="Bicycle">
                🚲
              </span>
            </h2>
            <p>Fastest biker!</p>
            Start:
            <br />
            <Select
              name="form-field-name"
              value={selectedStartStation}
              onChange={option => option && this.setState({ selectedStartStation: option.value })}
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
              value={selectedEndStation}
              onChange={option => option && this.setState({ selectedEndStation: option.value })}
              options={stationOptions}
            />
            <h3>Distance</h3>
            <p>0,46 km</p>
            <h3>
              High score{' '}
              <span role="img" aria-label="Clock">
                ⏱️
              </span>
            </h3>
            <ul>{highscoreResultsElements}</ul>
            {/* 
            <h3>All time fastest average ⚡</h3>
            <ul>
              <li>37 km/h (Spikersuppa → Bygdøy, 22. mars 2017) 🚨🚔👮</li>
              <li>24 km/h (Botanisk hage → Stortinget, 28. mars 2017</li>
            </ul>
            */}
          </div>
        </div>
        <div className="col-50">
          <Map stations={this.state.stations} />
        </div>
      </div>
    );
  }
}

export default App;
