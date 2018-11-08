import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: '0 0.5em',
  },
});

const Rating = ({ vote, classes, name }) => {
  return (
    <div className="rating">
      <div className="rating-rate">
        {vote ?
          <div style={{ display: 'flex', margin: '1em 0' }}>
            <CircularProgress className={classes.progress} variant="static" value={vote} name={name} />
            <div>
              <h3>
                {vote}%
              </h3>
              <p>
                des utilisateurs recommandent ce lieu.
              </p>
            </div>
          </div>
          :
          <p> Il n'y a pas encore de vote pour ce lieu. Soyez le premier en laissant un commentaire !</p>
        }
      </div>
    </div>
  );
};

// Rating.propTypes = {
//   rate: PropTypes.number.isRequired,
// };

export default withStyles(styles)(Rating);
