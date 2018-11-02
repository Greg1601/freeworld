import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const Rating = ({ vote, classes, name }) => {
  return (
    <div className="rating">
      <div className="rating-rate">
        <CircularProgress className={classes.progress} variant="static" value={vote} name={name}/>
        <div>
          <h3>
            {vote}%
          </h3>
          <p>
            des utilisateurs recommandent ce lieu.
          </p>
        </div>
      </div>
    </div>
  );
};

// Rating.propTypes = {
//   rate: PropTypes.number.isRequired,
// };

export default withStyles(styles)(Rating);
