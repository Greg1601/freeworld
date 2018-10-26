/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Upload from 'src/components/Lieu/Upload';

/*
 * Code
 */
// State
const mapStateToProps = state => ({});

// Actions
const mapDispatchToProps = dispatch => ({
  sendImageLieu: (image, id) => {
    dispatch({
      type: 'SEND_IMAGE_LIEU',
      image,
      id,
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
