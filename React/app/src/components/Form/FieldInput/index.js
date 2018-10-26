import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  input: {
    color: 'purple',
    '&:after': {
      borderBottom: '2px solid purple',
    },
  },
  label: {
    '&:after': {
      color: 'purple',
    },
  },
});

class FieldInput extends React.Component {
  static propTypes = {
    onChangeInput: PropTypes.func.isRequired,
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email', 'tel']),
  }

  static defaultProps = {
    value: '',
    type: 'text',
  }

  handleChange = (evt) => {
    const { value } = evt.target;
    this.props.onChangeInput(value);
  }

  render() {
    const {
      value,
      placeholder,
      name,
      type,
      classes,
    } = this.props;
    return (
      <div className="fieldinput">
        <TextField
          label={placeholder}
          onChange={this.handleChange}
          value={value}
          name={name}
          type={type}
          margin="normal"
          className={classes.textField}
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.label }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(FieldInput);
