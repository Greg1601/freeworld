/**
 * NPM import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Accueil from 'src/components/Accueil';
import { searchBarValue } from 'src/store/reducer';

/**
 * Code
 */

const mapStateToProps = state => ({
  searchBarValue: state.searchBarValue,
  searchName: state.resultName,
});

const mapDispatchToProps = dispatch => ({
  handleSearchBarValue: (evt) => {
    const { value } = evt.target;
    dispatch(searchBarValue(value));
  },
  submitSearch: value => (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'SEND_SEARCH',
      value,
    });
  },
  clearSearchBar: () => {
    dispatch({
      type: 'CLEAR_SEARCH_BAR',
    });
  },
});

const AccueilContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Accueil);

/**
 * Export
 */
export default AccueilContainer;
