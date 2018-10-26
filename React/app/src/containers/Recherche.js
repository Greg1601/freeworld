/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import Recherche from 'src/components/Recherche';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  categoryId: state.currentCategoryId,
  coords: state.coords,
  currentCategoryPoint: state.currentCategoryPoint,
});

// Actions
const mapDispatchToProps = dispatch => ({
  getCategoryPoint: (categoryId, coords) => {
    dispatch({
      type: 'GET_CATEGORY_POINT',
      categoryId,
      coords,
    });
  },
  clearPoint: () => {
    dispatch({
      type: 'CLEAR_POINT',
    });
  },
  clearCurrentPoint: () => {
    dispatch({
      type: 'CLEAN_CURRENT_POINT',
    });
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(Recherche);
