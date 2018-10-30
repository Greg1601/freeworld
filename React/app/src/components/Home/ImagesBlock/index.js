/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { NavLink } from 'react-router-dom';

/**
 * Local import
 */


/**
 * Code
 */

const styles = theme => ({
  block: {
    margin: '3em auto',
    width: '100%',
  },
  card: {
    maxWidth: '100%',
  },
  presentation: {
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: '50%',
    paddingTop: '20%',
  },
  actions: {
    textAlign: 'center',
    margin: '0.5em',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class ImagesBlock extends React.Component {
  state = { expanded: false };
  componentDidMount() {
    if (!this.props.categories) {
      this.props.getCategories();
  }
}

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, city } = this.props;

    console.log(this.props.categories)

    return (
      <div className="ImagesBlock">
        <div className={classes.block}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://picsum.photos/600/400/?random"
              title="Contemplative Reptile"
            />
            <CardContent>
              <h3>{city}</h3>
              <Typography className={classes.presentation}>
                Recherchez un lieu selon sa catégorie
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <h4>Catégories</h4>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <div className={classes.root}>
                  <List component="nav">
                    {(this.props.categories) ? this.props.categories.map(category => (
                      <ListItem
                        key={category.localized_name}
                        button
                        component={props =>
                          <NavLink to="/Recherche" {...props} />}
                      >
                        <ListItemText
                          key={category.identifier}
                          inset
                          primary={category.localized_name}
                          onClick={this.props.sendCategory(category.id)}
                        />
                      </ListItem>
                        ))
                        :
                    <ListItem button>
                      <div className="CircularProgress">
                        <CircularProgress
                          className={classes.progress}
                          style={{ color: purple[500] }}
                          thickness={7}
                        />
                      </div>
                    </ListItem>}
                  </List>
                </div>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      </div>
    );
  }
}

/**
 * Export
 */
ImagesBlock.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImagesBlock);
