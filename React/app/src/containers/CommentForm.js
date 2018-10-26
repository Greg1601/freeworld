/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import CommentForm from 'src/components/Lieu/CommentForm';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  comment: state.comment,
  titlecomment: state.titlecomment,
  userId: state.userId,
  placeId: state.currentPointBdd.Id,
});

// Actions
const mapDispatchToProps = dispatch => ({
  sendComment: (comment, titlecomment, userId, placeId, vote) => {
    dispatch({
      type: 'SEND_COMMENT',
      comment,
      titlecomment,
      userId,
      placeId,
      vote,
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
