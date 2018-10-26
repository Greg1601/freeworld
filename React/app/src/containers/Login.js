/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Login from 'src/components/Login';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  currentUser: state.currentUser,
  username: state.username,
  password: state.password,
  logged: state.logged,
});

// Actions
const mapDispatchToProps = dispatch => ({
  loginRequest: (username, password) => {
    dispatch({
      type: 'LOGIN_REQUEST',
      username,
      password,
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Login);
