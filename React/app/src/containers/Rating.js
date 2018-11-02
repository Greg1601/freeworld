/**
 * NPM import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Rating from 'src/components/Lieu/Rating';

/**
 * Code
 */

const mapStateToProps = state => ({
  vote: state.vote,
});

const mapDispatchToProps = dispatch => ({});

const RatingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rating);

/**
 * Export
 */
export default RatingContainer;
