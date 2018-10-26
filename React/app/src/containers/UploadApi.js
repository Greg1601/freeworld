/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import UploadApi from 'src/components/Lieu/UploadApi';

/*
 * Code
 */
// State
const mapStateToProps = state => ({});

// Actions
const mapDispatchToProps = dispatch => ({
  sendApi: (image, id) => {
    dispatch({
      type: 'SEND_API',
      image,
      id,
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(UploadApi);
