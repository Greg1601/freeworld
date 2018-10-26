import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

/**
* local import
*/

const tutorialSteps = [
  {
    label: 'Event1',
    adresse: 'Adresse',
    text: 'Presentation',
    imgPath: 'http://www.ot-enghienlesbains.fr/sites/ot-enghienlesbains/files/image/article/theatre-de-casino-fabrice-rambert.jpg',
  },
  {
    label: 'Event2',
    adresse: 'Adresse',
    text: 'Presentation 2',
    imgPath: 'http://www.lepoint.fr/images/2017/11/16/11328852lpw-11329053-article-theatre-jpg_4765039_660x281.jpg',
  },
  {
    label: 'Event3',
    adresse: 'Adresse',
    text: 'Presentation 3',
    imgPath: 'http://casaevents.ma/wp-content/uploads/2018/03/380883_presse.jpg',
  },
];

const styles = theme => ({
  root: {
    maxWidth: '100%',
    maxHeight: '100%',
    flexGrow: 1,
    border: '2px solid #5E2E68',
    marginBottom: '3em',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 600,
    maxWidth: 900,
    overflow: 'hidden',
    width: '100%',
  },
  mobileStepper: {
    backgroundColor: '#5E2E68',
  },
  button: {
    color: 'white',
  },
});

class Caroussel extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = (activeStep) => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map(step => (
            <div key={step.label} className="carousel">
              <img className={classes.img} src={step.imgPath} alt={step.label} />
              <div className="carousel-text">
                <h3>
                  {step.label}
                </h3>
                <div>
                  <h4>
                    Adresse
                  </h4>
                  <p>
                    {step.adresse}
                  </p>
                </div>
                <div>
                  <h4>
                    Quand ?
                  </h4>
                </div>
                <div>
                  <h4>
                    Presentation
                  </h4>
                  <p>
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
              className={classes.button}
            >
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
              className={classes.button}
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

Caroussel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Caroussel);
