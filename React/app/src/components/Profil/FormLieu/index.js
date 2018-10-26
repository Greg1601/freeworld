import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FieldInput from 'src/containers/FieldInput';
import SubmitButton from 'src/components/Form/SubmitButton';
import MultipleSelect from 'src/containers/MultipleSelect';
import Arrow from 'react-icons/lib/fa/arrow-left';
import TextArea from 'src/containers/TextArea';
import { NavLink, Redirect } from 'react-router-dom';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    minWidth: 300,
    margin: '1em',
  },
});

const labels = [
  {
    name: 'rampe',
    label: 'Ce lieu dispose-t-il d\'une rampe ?',
    id: 1,
  },
  {
    name: 'ascenseur',
    label: 'Ce lieu dispose-t-il d\'un ascenseur ?',
    id: 2,
  },
  {
    name: 'place',
    label: 'Ce lieu dispose-t-il de place de parking réservées ?',
    id: 3,
  },
  {
    name: 'wc',
    label: 'Ce lieu dispose-t-il de WC adaptés ?',
    id: 4,
  },
  {
    name: 'entree',
    label: 'Ce lieu dispose-t-il d\'une entrée adaptée ?',
    id: 5,
  },
];

class FormLieu extends React.Component {
  state = {
    placetype: '',
    entree: false,
    place: false,
    ascenseur: false,
    rampe: false,
    wc: false,
 };

  handleChange = event => {
    this.setState({ placetype: event.target.value });
  };

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { placename, placecity, postalcode, placeaddress, placedescription, userId } = this.props;
    const { placetype, entree, rampe, ascenseur, wc, place } = this.state;
    const address = `${placeaddress}, ${placecity}`;
    this.props.googleGeo(userId, address, placename, placecity, postalcode, placeaddress, placedescription, placetype, entree, rampe, ascenseur, wc, place);
  }
  render() {
    const { changeState, classes, categories } = this.props;
    if (this.props.data) {
      return (
        <Redirect push to="/" />
      );
    }
    return (
      <div className="formlieu">
        <Arrow
          onClick={changeState('profil')}
          className="buttonplus-icon"
        />
        <form className="formlieu-form" onSubmit={this.handleSubmit}>
          <FieldInput
            name="placename"
            placeholder="Nom du lieu"
            type="text"
          />
          <FieldInput
            name="placecity"
            placeholder="Ville du lieu"
            type="text"
          />
          <FieldInput
            name="postalcode"
            placeholder="Code postal"
            type="text"
          />
          <FieldInput
            name="placeaddress"
            placeholder="Adresse du lieu"
            type="text"
          />
          <TextArea
            name="placedescription"
            placeholder="Description du lieu"
            type="text"
          />
          {/* <MultipleSelect name="placeinterests" /> */}
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select">Type du lieu</InputLabel>
            <Select
              value={this.state.placetype}
              name="placetype"
              onChange={this.handleChange}
              inputProps={{
                name: 'placetype',
              }}
            >
              {categories.map(category => (
                <MenuItem value={category.id}>{category.localized_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="formlieu-form-select">
            {labels.map(label => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={label.name}
                    checked={this.state.name}
                    onChange={this.handleCheck}
                    value={this.state.name}
                    color="primary"
                  />
                }
                label={label.label}
              />
            ))}
          </div>
          <SubmitButton />
        </form>
      </div>
    );
  }
}

FormLieu.propTypes = {
  changeState: PropTypes.func.isRequired,
  placename: PropTypes.string.isRequired,
  placecity: PropTypes.string.isRequired,
  placeaddress: PropTypes.string.isRequired,
  placedescription: PropTypes.string.isRequired,
  googleGeo: PropTypes.func.isRequired,
};

export default withStyles(styles)(FormLieu);
