/**
 * NPM import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import FicheProfil from 'src/components/Profil/FicheProfil';

/**
 * Code
 */

const mapStateToProps = state => ({
  userId: state.userId,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  sendImage: (imageUrl, id) => {
    dispatch({
      type: 'SEND_IMAGE',
      imageUrl,
      id,
    });
  },
});

const FicheProfilContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FicheProfil);

/**
 * Export
 */
export default FicheProfilContainer;
