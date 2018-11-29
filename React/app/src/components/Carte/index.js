import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import purple from '@material-ui/core/colors/purple';
import myIcon from 'src/utils/icon';
import { NavLink } from 'react-router-dom';
import CategoryName from 'src/utils/categoryName';
import {placeUrl} from 'src/utils/url'

// essai route to={placeUrl(point.Id, point.Name)}

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
  },
  select: {
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5em',
      marginTop: '1em',
    },
  },
  li: {
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5em',
      padding: '0.5em',
    },
  },
  font: {
    [theme.breakpoints.down('md')]: {
      fontSize: '1em',
    },
  },
  label: {
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5em',
    },
  },
});

class Carte extends Component {
  static propTypes = {
    contained: PropTypes.string,
    coords: PropTypes.array,
    nodes: PropTypes.array,
    nodesBdd: PropTypes.array,
  }
  static defaultProps = {
    contained: 'flat',
    coords: false,
    nodes: false,
    nodesBdd: false,
  }

  state = {
    placetype: '',
  }

  componentWillUnmount() {
    this.props.clearNodes();
  }

  filterCategory = (event) => {
    event.preventDefault();
    this.setState({ placetype: event.target.value });
    this.props.filterPoints(event.target.value);
  };

  render() {

    const {
      classes,
      contained,
      zoom,
      coords,
      nodes,
      getInfo,
      nodesBdd,
      getLocation,
      getPoints,
      getCity,
      getPointBdd,
      getInfoBdd,
      categories,
    } = this.props;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => getLocation(position));
      if (coords && !nodes) {
        getPoints(coords);
        getCity(coords);
        if (!nodesBdd) {
          getPointBdd();
        }
      }
      else if (coords && nodes) {
        return (
          <div id="map-container">
            <form id="map-container-form">
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label} htmlFor="category">Catégories</InputLabel>
                <Select
                  value={this.state.placetype}
                  name="category"
                  className={classes.select}
                  onChange={this.filterCategory}
                  inputProps={{
                    name: 'category',
                    id: 'category',
                  }}
                >
                  <MenuItem className={classes.li} value="all">Tous les catégories</MenuItem>
                  {categories.map(node => (
                    <MenuItem
                      key={node.identifier}
                      value={node.id}
                      className={classes.li}
                    >
                      {node.localized_name}
                    </MenuItem>
                ))}
                </Select>
              </FormControl>
            </form>
            <Map
              center={coords}
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
                  className="marker"
                  icon={myIcon(point.category.id)}
                >
                  <Popup className="map-popup">
                    <div>
                      <h3><span>Catégorie : </span>{point.category.identifier}</h3>
                      <h4><span>Type : </span>{point.node_type.identifier}</h4>
                      <h1><span>Nom : </span>{point.name || 'Non communiqué'}</h1>
                      <p><span>Tel : </span>{point.phone || 'Non communiqué'}</p>
                      <p><span>Accessibilité</span> : {(point.wheelchair) ? 'Oui' : 'Non'}</p>
                      <NavLink exact to={placeUrl(point.id, point.name)}>
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
              {(nodesBdd) ? nodesBdd.map(point => (
                <Marker
                  key={point.Id}
                  position={[point.Latitude, point.Longitude]}
                  icon={myIcon(point.Placetype)}
                >
                  <Popup>
                    <div>
                      <h3><span>Catégorie : </span>{CategoryName(point.Placetype)}</h3>
                      <h1><span>Nom : </span>{point.Name || ''}</h1>
                      <p><span>address : </span>{point.Address || ''}</p>
                      {/* <p><span>Accessibilité</span> : {(point.Access) ? 'oui' : 'non'}</p> */}
                      <NavLink exact to={placeUrl(point.Id, point.Name)}>
                        <Button
                          variant={contained}
                          className={classes.font}
                          onClick={getInfoBdd(point.Id)}
                        >
                          Voir
                        </Button>
                      </NavLink>
                    </div>
                  </Popup>
                </Marker>
              )) : 'pas de resultat ...'}
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

Carte.propTypes = {
  clearNodes: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
  getInfo: PropTypes.func.isRequired,
  getLocation: PropTypes.func.isRequired,
  filterPoints: PropTypes.func.isRequired,
  getPoints: PropTypes.func.isRequired,
  getCity: PropTypes.func.isRequired,
  getPointBdd: PropTypes.func.isRequired,
  getInfoBdd: PropTypes.func.isRequired,
};

export default withStyles(styles)(Carte);
