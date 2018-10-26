/**
 * NPM import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import InfosLieu from 'src/components/Recherche/InfosLieu';

/**
 * Code
 */

const mapStateToProps = (state, ownProps) => ({
  addressList: state[ownProps.id],
});

const mapDispatchToProps = dispatch => ({
  getAddress: (id, lat, lon) => {
    dispatch({
      type: 'GET_ADDRESS',
      id,
      lat,
      lon,
    });
  },
  getInfo: point => () => {
    dispatch({
      type: 'GET_INFO',
      point,
    });
  },
});

const InfosLieuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfosLieu);

/**
 * Export
 */
export default InfosLieuContainer;
