import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
});

class TextArea extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
  };

  static defaultProps = {
    value: '',
  };

  handleChange = (evt) => {
    const { value } = evt.target;
    this.props.onChangeInput(value);
  }

  render() {
    const {
      classes,
      value,
      name,
      placeholder,
    } = this.props;
    return (
      <TextField
        id="multiline-flexible"
        label={placeholder}
        multiline
        rowsMax="4"
        margin="normal"
        onChange={this.handleChange}
        name={name}
        value={value}
        className={classes.textField}
      />
    );
  }
}

export default withStyles(styles)(TextArea);
