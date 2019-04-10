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
    const popupStation = stations.find(({ station_id }) => {
      return station_id === selectedStation;
    });

    const { name, lon, lat } = popupStation;

    return (
      <Fragment>
        <Popup key={selectedStation} coordinates={[lon, lat]}>
          <div>
            <div>{name}</div>
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
        {stations.map(({ station_id, lat, lon }) => {
          return (
            <Feature
              key={station_id}
              coordinates={[lon, lat]}
              onMouseEnter={e => {
                handleMarkerHover(e);
              }}
              onMouseLeave={e => {
                handleMarkerHover(e);
              }}
              onClick={() => {
                handleMapMarkerClick(station_id);
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
