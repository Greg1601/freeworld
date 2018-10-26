/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import FormEditProfil from 'src/components/Profil/FormEditProfil';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  email: state.email,
  password: state.password,
});

// Actions
const mapDispatchToProps = dispatch => ({
  changeView: (view) => {
    dispatch({
      type: 'CHANGE_VIEW',
      view,
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(FormEditProfil);
