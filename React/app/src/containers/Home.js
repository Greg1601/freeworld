/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Home from 'src/components/Home';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  logged: state.logged,
  username: state.currentUser,
});

// Actions
const mapDispatchToProps = {};


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home);
