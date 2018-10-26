/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Profil from 'src/components/Profil';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  view: state.view,
  currentUser: state.currentUser,
  userInfo: state.userInfo,
  city: state.city,
});

// Actions
const mapDispatchToProps = dispatch => ({});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Profil);
