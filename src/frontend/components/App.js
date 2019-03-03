import React, { Component } from 'react';
import Select from 'react-select';
import sortBy from 'sort-by';
import {format} from 'date-fns';
import nb from 'date-fns/locale/nb'

import humanizeDuration from '../../shared/utils/humanize-duration';
import './App.css';
import 'react-select/dist/react-select.css';
import {getBysykkelStations, getHighscoreByStations} from '../services/backend-api';

class App extends Component {
  state = {
    stationOptions: [],
    selectedStartStation: null,
    selectedEndStation: null,
    highscoreResults: [],
  }

  async componentDidMount() {
    this.handlePopulateStationOptions();
  }

  componentDidUpdate(prevProps, prevState) {
    this.handlePopulateHighscore(prevProps, prevState);
  }

  async handlePopulateHighscore(prevProps, prevState) {
    const {
      selectedStartStation,
      selectedEndStation
    } = this.state;

    const {
      selectedStartStation: prevSelectedStartStation, 
      selectedEndStation: prevSelectedEndStation
    } = prevState;

    // Both stations should have a value
    if (!selectedEndStation || !selectedEndStation) {
      return;
    }

    // Start and stop can not be the same
    if (selectedStartStation === selectedEndStation) {
      return;
    };

    // Is there a change?
    if (
      selectedStartStation === prevSelectedStartStation && 
      selectedEndStation === prevSelectedEndStation
    ) {
      return;
    };

    console.log(Date.now() + ' changed');

    const highscoreResults = await getHighscoreByStations(selectedStartStation, selectedEndStation);
    this.setState({highscoreResults});

  }

  async handlePopulateStationOptions() {
    const stations = await getBysykkelStations();
    const stationOptions = stations
      .map(function(station) {
        return {
          value: station.id, 
          label: `${station.title} (${station.subtitle})`
        }
      })
      .sort(sortBy('label'));
    this.setState({stationOptions});    
  }

  render() {

    const {
      stationOptions, 
      selectedStartStation, 
      selectedEndStation,
      highscoreResults,
    } = this.state;

    const highscoreResultsElements = highscoreResults.map(function({ time, date }) {
      return <li>{humanizeDuration(time)} ({format(new Date(date), 'DD. MMM YYYY', { locale: nb })})</li>
    });

    return (
      <div className="App">
        <h2>Oslo bysykkel API 🚲</h2>
        <p>Fastest biker!</p>

        Start:<br />
        <Select
          name="form-field-name"
          value={selectedStartStation}
          onChange={(option) => option && this.setState({selectedStartStation: option.value})}
          options={stationOptions}
        />

        <br /><br />
        Stop:<br />
        <Select
          name="form-field-name"
          value={selectedEndStation}
          onChange={(option) => option && this.setState({selectedEndStation: option.value})}
          options={stationOptions}
        />

        <h3>Distance 🗺️</h3>
        <p>0,46 km (<a href="#">map</a>)</p>

        <h3>High score ⏱️</h3>
        <ul>
          { highscoreResultsElements}
        </ul>

        <h3>All time fastest average ⚡</h3>
        <ul>
          <li>37 km/h (Spikersuppa → Bygdøy, 22. mars 2017) 🚨🚔👮</li>
          <li>24 km/h (Botanisk hage → Stortinget, 28. mars 2017</li>  
        </ul>
      </div>
    );
  }
}

export default App;
