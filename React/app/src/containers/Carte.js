/**
 * NPM import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Carte from 'src/components/Carte';

/**
 * Code
 */

const mapStateToProps = state => ({
  coords: state.coords,
  zoom: state.zoom,
  nodes: state.nodes,
  nodesBdd: state.nodesBdd,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  getCity: (coords) => {
    dispatch({
      type: 'CURRENT_CITY',
      coords,
    });
  },
  getLocation: (position) => {
    dispatch({
      type: 'CURRENT_LOCATION',
      position: [position.coords.latitude, position.coords.longitude],
    });
  },
  getPoints: (coords) => {
    dispatch({
      type: 'GET_POINTS',
      coords,
    });
  },
  clearNodes: () => {
    dispatch({
      type: 'CLEAR_NODES',
    });
  },
  getInfo: point => () => {
    dispatch({
      type: 'GET_INFO',
      point,
    });
  },
  getPointBdd: () => {
    dispatch({
      type: 'GET_POINT_BDD',
    });
  },
  getInfoBdd: id => () => {
    dispatch({
      type: 'GET_INFO_BDD',
      id,
    });
  },
  filterPoints: (value) => {
    dispatch({
      type: 'FILTER_POINTS',
      value,
    });
  },
});

const CarteContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Carte);

/**
 * Export
 */
export default CarteContainer;
