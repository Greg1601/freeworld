/**
 * Npm import
 */
import React from 'react';
import Arrow from 'react-icons/lib/io/android-arrow-dropdown-circle';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
/**
 * Local import
 */


/**
 * Code
 */
class Accueil extends React.Component {
  static propTypes = {
    searchName: PropTypes.string,
    searchBarValue: PropTypes.string,
  }
  static defaultProps = {
    searchName: false,
    searchBarValue: '',
  }
  componentDidMount() {
    this.props.clearSearchBar();
  }
  render() {
    const {
      searchBarValue,
      handleSearchBarValue,
      submitSearch,
      searchName,
    } = this.props;

    if (searchName) {
      return (
        <Redirect exact to="/SearchMap" />
      );
    }
    return (
      <div id="accueil">
        <form
          id="accueil-searchBar"
          onSubmit={submitSearch(searchBarValue)}
        >
          <input
            type="text"
            placeholder="Ville, code postal"
            value={searchBarValue}
            onChange={handleSearchBarValue}
          />
          <button>OK</button>
        </form>
        <div id="accueil-banner">
          <Arrow id="accueil-arrow" />
          <p>
            Redécouvrez le monde qui vous entoure
          </p>
        </div>
      </div>
    );
  }
}

Accueil.propTypes = {
  handleSearchBarValue: PropTypes.func.isRequired,
  submitSearch: PropTypes.func.isRequired,
  clearSearchBar: PropTypes.func.isRequired,
};

/**
 * Export
 */
export default Accueil;
