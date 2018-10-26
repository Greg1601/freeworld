/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Signup from 'src/components/Signup';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  username: state.username,
  email: state.email,
  password: state.password,
  response: state.response,
  description: state.description,
  city: state.city,
  // presentation: state.presentation,
  // userinterests: state.userinterests,
});

// Actions
const mapDispatchToProps = dispatch => ({
  signupRequest: (username, email, password, description, city) => {
    dispatch({
      type: 'SIGNUP_REQUEST',
      username,
      email,
      password,
      description,
      city,
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
