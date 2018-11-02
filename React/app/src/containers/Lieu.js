/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Lieu from 'src/components/Lieu';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  currentPoint: state.currentPoint,
  currentPointBdd: state.currentPointBdd,
  currentPointBddId: state.currentPointBddId,
  photos: state.photos,
  placeId: state.currentPoint,
  currentUser: state.currentUser,
  userId: state.userId,
});

// Actions
const mapDispatchToProps = dispatch => ({
  cleanCurrentPoint: () => {
    dispatch({
      type: 'CLEAN_CURRENT_POINT',
    });
  },
  getImages: (id) => {
    dispatch({
      type: 'GET_IMAGES',
      id,
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Lieu);
