/**
 * NPM import
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

/**
 * Local import
 */

import InfosLieu from 'src/containers/InfosLieu';

/**
 * Code
 */

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Recherche extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.clearPoint();
  }

  render() {
    const { classes } = this.props;
    const {
      currentCategoryPoint,
      getCategoryPoint,
      categoryId,
      coords,
    } = this.props;

    if (!currentCategoryPoint && categoryId) {
      getCategoryPoint(categoryId, coords);
    }
    else if (currentCategoryPoint) {
      return (
        <div className="recherche">
          <div className="recherche-block">
            {currentCategoryPoint.map(point =>
              <InfosLieu key={point.id} {...point} categoryId={categoryId} point={point} />)}
          </div>
        </div>
      );
    }
    return (
      <CircularProgress
        className={classes.progress}
        style={{ color: purple[500] }}
        thickness={7}
      />
    );
  }
}

/**
 * Export
 */
export default withStyles(styles)(Recherche);
