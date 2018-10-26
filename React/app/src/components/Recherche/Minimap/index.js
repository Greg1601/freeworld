import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import myIcon from 'src/utils/icon';

const Minimap = ({ lat, lon, categoryId, point }) => (
  <div id="map-container">
    <Map
      center={[lat, lon]}
      zoom={21}
      id="map"
    >
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        key={lat}
        position={[lat, lon]}
        icon={myIcon(categoryId)}
      />
    </Map>
  </div>
);


export default Minimap;
