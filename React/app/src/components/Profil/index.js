/**
 * NPM import
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Local import
 */

import FicheProfil from 'src/containers/FicheProfil';
import SettingsButton from 'src/components/Profil/SettingsButton';
import ButtonPlus from 'src/components/ButtonPlus';
import FormLieu from 'src/containers/FormLieu';
import FormEditProfil from 'src/components/Profil/FormEditProfil';


/**
 * Code
 */

class Profil extends React.Component {
  state = {
    view: 'profil',
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  changeView = newView => () => {
    this.setState({
      view: newView,
    });
  };

  render() {
    const { view } = this.state;
    const { classes, currentUser, email } = this.props;
    console.log(this.props)
    if (currentUser) {
      return (
        <div>
          <div className="profil">
            { view === 'profil' &&
            <div>
              <FicheProfil
                changeState={this.changeView}
                currentUser={currentUser}
                email={email}
              />
            </div>
          }
            {
              view === 'editProfil' &&
              <FormEditProfil changeState={this.changeView} />
            }
            {
              view === 'addPlace' &&
              <FormLieu changeState={this.changeView} />
            }
          </div>
        </div>
      );
    }
    return (
      <div id="reconnect">
        Vous êtes déconnecté, Merci de vous <NavLink exact to="/Login" className="link">connecter</NavLink> ou <NavLink exact to="Signup" className="link">créer</NavLink> un compte.
      </div>
    );
  }
}

/**
 * Export
 */
export default Profil;
