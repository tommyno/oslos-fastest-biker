import React, { Fragment } from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl, Popup } from 'react-mapbox-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Create map
const BicycleStationMap = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
});

const Map = React.memo(function Map(props) {
  const {
    stations,
    mapSettings: { selectedStation, zoomLevel, center },
    handleMapMarkerClick,
  } = props;

  console.log('load map');

  // Change cursor icon on map marker hover
  const handleMarkerHover = e => {
    if (!e.type) return;
    if (e.type === 'mouseenter') {
      e.map.getCanvas().style.cursor = 'pointer';
    } else if (e.type === 'mouseleave') {
      e.map.getCanvas().style.cursor = '';
    }
  };

  // Show popup on map
  const renderPopup = () => {
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
  };

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
              onMouseEnter={e => {
                handleMarkerHover(e);
              }}
              onMouseLeave={e => {
                handleMarkerHover(e);
              }}
              onClick={() => {
                handleMapMarkerClick(index);
              }}
            />
          );
        })}
      </Layer>
      {selectedStation && renderPopup()}
      <ZoomControl />
    </BicycleStationMap>
  );
});

export default Map;
