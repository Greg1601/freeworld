/**
 * NPM import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import SearchMap from 'src/components/SearchMap';

/**
 * Code
 */

const mapStateToProps = state => ({
  zoom: state.zoom,
  nodes: state.nodes,
  lat: state.resultLat,
  lon: state.resultLon,
  name: state.resultName,
});

const mapDispatchToProps = dispatch => ({
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
  clearResult: () => {
    dispatch({
      type: 'CLEAR_RESULT',
    });
  },
  getInfo: point => () => {
    dispatch({
      type: 'GET_INFO',
      point,
    });
  },
});

const SearchMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchMap);

/**
 * Export
 */
export default SearchMapContainer;
