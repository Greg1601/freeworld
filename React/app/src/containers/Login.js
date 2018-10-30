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
  email: state.email,
  password: state.password,
  logged: state.logged,
});

// Actions
const mapDispatchToProps = dispatch => ({
  loginRequest: (email, password) => {
    dispatch({
      type: 'LOGIN_REQUEST',
      email,
      password,
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Login);
