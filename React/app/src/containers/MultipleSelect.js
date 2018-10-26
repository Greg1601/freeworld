/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import MultipleSelect from 'src/components/Form/MultipleSelect';
import { changeInputValue } from 'src/store/reducer';


/*
 * Code
 */
// State
const mapStateToProps = (state, ownProps) => ({
  value: state[ownProps.name],
});

// Actions
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeInput: (value) => {
    dispatch(changeInputValue({ name: ownProps.name, value }));
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(MultipleSelect);
