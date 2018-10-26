import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import myIcon from 'src/utils/icon';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class SearchMap extends Component {
  componentWillUnmount() {
    this.props.clearResult();
  }
  render() {
    const {
      classes,
      contained,
      zoom,
      lat,
      lon,
      name,
      nodes,
      getInfo,
    } = this.props;

    if (lat && lon) {
      if (lat && lon && !nodes) {
        this.props.getPoints([lat, lon]);
      }
      else if (nodes) {
        return (
          <div id="map-container" className="map-search">
            <h2 className="map-search-title">Resultat pour : {name}</h2>
            <Map
              center={[lat, lon]}
              zoom={zoom}
              scrollWheelZoom={false}
              zoomControl
              id="map"
            >
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {nodes.map(point => (
                <Marker
                  key={point.id}
                  position={[point.lat, point.lon]}
                  icon={myIcon(point.category.id)}
                >
                  <Popup>
                    <div>
                      <h3>{point.category.identifier}</h3>
                      <h4>{point.node_type.identifier}</h4>
                      <h1>{point.name || ''}</h1>
                      <p>tel:{point.phone || ''}</p>
                      <p>acces: {point.wheelchair || ''}</p>
                      <NavLink exact to="/Lieu">
                        <Button
                          variant={contained}
                          className="pagelieu-button"
                          onClick={getInfo(point)}
                          >
                          Voir
                        </Button>
                      </NavLink>
                    </div>
                  </Popup>
                </Marker>
        ))}
            </Map>
          </div>
        );
      }
    }
    return (
      <div className="CircularProgress">
        <CircularProgress
          className={classes.progress}
          style={{ color: purple[500] }}
          thickness={7}
        />
      </div>
    );
  }
}
// }

export default withStyles(styles)(SearchMap);
