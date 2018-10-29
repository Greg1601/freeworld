import React from 'react';
import PropTypes from 'prop-types';
import FieldInput from 'src/containers/FieldInput';
import SubmitButton from 'src/components/Form/SubmitButton';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  snackbar: {
    marginTop: '5em',
  },
});

class Login extends React.Component {
  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    logged: PropTypes.bool,
    currentUser: PropTypes.string,
  }
  static defaultProps = {
    email: '',
    password: '',
    logged: false,
    currentUser: false,
  }
  state = {
    open: false,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const {
      email,
      password,
      loginRequest,
      logged,
    } = this.props;

    loginRequest(email, password);
    if (!logged) {
      setTimeout(() => this.setState({ open: true }), 1000);
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };


  render() {
    const { classes, currentUser } = this.props;
    if (currentUser) {
      return (
        <Redirect push to="/" />
      );
    }
    return (
      <div className="formlogin">
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          className={classes.snackbar}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Identification incorrecte</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
            ]}
        />
        <form onSubmit={this.handleSubmit} >
          <FieldInput
            name="email"
            placeholder="Email"
            type="text"
          />
          <FieldInput
            name="password"
            placeholder="Mot de passe"
            type="password"
          />
          <SubmitButton />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
