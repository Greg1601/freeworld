import React from 'react';
import Plus from 'react-icons/lib/fa/plus';
import PropTypes from 'prop-types';

const ButtonPlus = ({ changeState }) => (
  <div className="buttonplus">
    <span>Revenir</span>
    <Plus
      onClick={changeState('addPlace')}
      className="buttonplus-icon"
    />
  </div>
);

ButtonPlus.propTypes = {
  changeState: PropTypes.func.isRequired,
};

export default ButtonPlus;
