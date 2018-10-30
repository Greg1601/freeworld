/**
 * NPM import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Header from 'src/components/Header';

/**
 * Code
 */

const mapStateToProps = state => ({
  username: state.currentUser,
  userId: state.userId,
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch({
      type: 'LOGOUT',
    });
  },
  getUserInfo: (userId, token) => () => {
    dispatch({
      type: 'GET_USER_INFO',
      userId,
      token,
    });
  },
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

/**
 * Export
 */
export default HeaderContainer;
