import React from 'react';

import Rating from 'src/containers/Rating';
import Minimap from 'src/components/Recherche/Minimap';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import myIcon from 'src/utils/icon';
import { NavLink } from 'react-router-dom';

import {placeUrl} from 'src/utils/url'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const InfosLieu = ({
  id,
  name,
  city,
  phone,
  website,
  lat,
  lon,
  categoryId,
  getAddress,
  addressList,
  point,
  classes,
  contained,
  getInfo,
}) => {
  if (!id) {
    return (
      <div className="CircularProgress">
        <CircularProgress
          className={classes.progress}
          style={{ color: purple[500] }}
          thickness={7}
        />
      </div>
    );
  }
  else if (id && lat && lon && !addressList) {
    getAddress(id, lat, lon);
    return (
      <div className="CircularProgress">
        <CircularProgress
          className={classes.progress}
          style={{ color: purple[500] }}
          thickness={7}
        />
      </div>
    );
  }
  return (
    <div className="infoslieu">
      <div>
        <hr />
        <h4>{(!name) ? 'aucun' : name}</h4>
        <div>
          <h5>Adresse</h5>
          <p>{(addressList) || 'aucun'}</p>
        </div>
        <div>
          <h5>Coordonnées</h5>
          <p>Tel: {(phone) || 'aucun'}</p>
          <p>site: {(website) || 'aucun'}</p>
        </div>
        <div>
          <h5>Appréciation</h5>
          <Rating />
        </div>
        <NavLink exact to={placeUrl(id, name)}>
          <Button
            variant={contained}
            className="pagelieu-button"
            onClick={getInfo(point)}
          >
            Voir
          </Button>
        </NavLink>
      </div>
      <div className="infoslieu-minimap">
        <Minimap lat={lat} lon={lon} categoryId={categoryId} point={point} />
      </div>
    </div>
  );
};


export default withStyles(styles)(InfosLieu);
