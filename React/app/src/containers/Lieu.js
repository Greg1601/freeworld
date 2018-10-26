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
  photos: state.photos,
  placeId: state.currentPoint,
  currentUser: state.currentUser,
  comments: state.comments,
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
  getComment: (id) => {
    dispatch({
      type: 'GET_COMMENT',
      id,
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Lieu);
