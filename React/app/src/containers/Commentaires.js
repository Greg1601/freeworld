/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Commentaires from 'src/components/Lieu/Commentaires';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  comments: state.comments,
});

// Actions
const mapDispatchToProps = dispatch => ({
  getComment: (id) => {
    dispatch({
      type: 'GET_COMMENT',
      id,
    });
  },
  cleanComments: () => {
    dispatch({
      type: 'CLEAN_COMMENTS',
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Commentaires);
