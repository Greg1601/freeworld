/**
 * NPM import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import ImagesBlock from 'src/components/Home/ImagesBlock';

/**
 * Code
 */

const mapStateToProps = state => ({
  city: state.currentCity,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => {
    dispatch({
      type: 'GET_CATEGORY',
    });
  },
  sendCategory: categoryId => () => {
    dispatch({
      type: 'SEND_CATEGORY',
      categoryId,
    });
  },
});

const ImagesBlockContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImagesBlock);

/**
 * Export
 */
export default ImagesBlockContainer;
