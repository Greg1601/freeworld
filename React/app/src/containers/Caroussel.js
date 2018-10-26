/**
 * NPM import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Caroussel from 'src/components/Home/Caroussel';

/**
 * Code
 */

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const CarousselContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Caroussel);

/**
 * Export
 */
export default CarousselContainer;
