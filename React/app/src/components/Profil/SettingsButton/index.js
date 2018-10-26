import React from 'react';
import Settings from 'react-icons/lib/fa/cog';
import PropTypes from 'prop-types';

const SettingsButton = ({ changeState }) => (
  <div className="settingsbutton">
    <Settings
      className="settingsbutton-icon"
      onClick={changeState('editProfil')}
    />
    <h5>Modifier le profil</h5>
  </div>
);

SettingsButton.propTypes = {
  changeState: PropTypes.func.isRequired,
};


export default SettingsButton;
