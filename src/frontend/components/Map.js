import React, { Component, Fragment } from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl, Popup } from 'react-mapbox-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Se demo a la bysykkel her: http://alex3165.github.io/react-mapbox-gl/demos
const BicycleStationMap = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
});

class Map extends Component {
  state = {
    selectedStation: null, // index
    zoomLevel: 12,
    center: ['10.7522', '59.9139'],
  };

  // Show click cursor and add station to state
  handleMarkerHover(e, index) {
    if (!e.type) return;
    if (e.type === 'mouseenter') {
      e.map.getCanvas().style.cursor = 'pointer';
    } else if (e.type === 'mouseleave') {
      e.map.getCanvas().style.cursor = '';
    }
  }

  handleMarkerClick(e, index) {
    const {
      center: { longitude, latitude },
    } = this.props.stations[index];
    this.setState({ selectedStation: index, zoomLevel: 14, center: [longitude, latitude] });
  }

  renderPopup() {
    const { stations } = this.props;
    const { selectedStation } = this.state;
    const {
      title,
      subtitle,
      center: { longitude, latitude },
    } = stations[selectedStation];

    return (
      <Fragment>
        <Popup key={selectedStation} coordinates={[longitude, latitude]}>
          <div>
            <div>{title}</div>
            <div>{subtitle}</div>
          </div>
        </Popup>
      </Fragment>
    );
  }

  render() {
    const { stations } = this.props;
    const { selectedStation, zoomLevel, center } = this.state;

    return (
      <BicycleStationMap
        // eslint-disable-next-line
        style={'mapbox://styles/mapbox/streets-v9'}
        zoom={[zoomLevel]}
        center={center}
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'bicycle-15' }}>
          {stations.map((station, index) => {
            const {
              id,
              center: { latitude, longitude },
            } = station;
            return (
              <Feature
                key={id}
                coordinates={[longitude, latitude]}
                testProp="yolo"
                onMouseEnter={e => {
                  this.handleMarkerHover(e, index);
                }}
                onMouseLeave={e => {
                  this.handleMarkerHover(e, index);
                }}
                onClick={e => {
                  this.handleMarkerClick(e, index);
                }}
              />
            );
          })}
        </Layer>
        {selectedStation && this.renderPopup()}
        <ZoomControl />
      </BicycleStationMap>
    );
  }
}

export default Map;
