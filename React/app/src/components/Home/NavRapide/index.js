import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const cards = [
  {
    key: 1,
    title: 'Rechercher un lieu',
    presentation: 'Parcourez les différents lieux référencés et accessibles près de chez vous.',
    imgPath: 'https://www.silicon.fr/wp-content/uploads/logos/geolocalisationcartemap2.jpg',
  },
  {
    key: 2,
    title: 'Votre avis compte',
    presentation: 'Notez les lieux dans lesquels vous vous êtes rendus et ajoutez un commentaire.',
    imgPath: 'https://tildenhalldc.com/wp-content/uploads/People-Talking-Laughing.jpg',
  },
  {
    key: 3,
    title: 'Devenez un guide',
    presentation: 'Vous pouvez ajouter un lieu depuis votre page de profil.',
    imgPath: 'https://serene-marceau.fr/wp-content/uploads//2016/02/S004-Place-de-la-Concorde.jpg',
  },
];

function NavRapide(props) {
  const { classes } = props;
  return (
    <div className="navrapide">
      {cards.map(card => (
        <Card key={card.key} className={classes.card}>
          <CardMedia
            className={classes.media}
            image={card.imgPath}
            title={card.title}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {card.title}
            </Typography>
            <Typography component="p">
              {card.presentation}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button className="button" size="medium" color="primary">
              Voir plus
            </Button> */}
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

NavRapide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavRapide);
