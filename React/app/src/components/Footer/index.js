/**
* Npm import
*/
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import FieldInput from 'src/containers/FieldInputFooter';
/**
* Local import
*/


/**
* Code
*/

class Footer extends React.Component {
  handleFooter = (evt) => {
    evt.preventDefault();

    const {
      footerTitle,
      footerLastname,
      footerFirstname,
      footerEmail,
      footerPhone,
      footerMessage,
    } = this.props;

    const { sendFooter } = this.props;

    const footer = {
      title: footerTitle,
      lastName: footerLastname,
      firstName: footerFirstname,
      email: footerEmail,
      phone: footerPhone,
      message: footerMessage,
    };
    sendFooter(footer);
  }
  render() {
    return (
      <div>
        <footer>
          <div id="question">
            <h2>Une question ?</h2>
            <p>Vous avez une question ou une suggestion ? n'hesitez pas a nous contacter !</p>
          </div>
          <form onSubmit={this.handleFooter}>
            <FieldInput
              type="text"
              placeholder="Titre"
              name="footerTitle"
            />
            <FieldInput
              type="text"
              placeholder="Nom"
              name="footerFirstname"
            />
            <FieldInput
              type="text"
              placeholder="Prenom"
              name="footerLastname"
            />
            <FieldInput
              type="text"
              placeholder="Email"
              name="footerEmail"
            />
            <FieldInput
              type="text"
              placeholder="Telephone"
              name="footerPhone"
            />
            <FieldInput
              type="text"
              placeholder="Message"
              name="footerMessage"
            />
            <button>Envoyer</button>
          </form>
        </footer>
        <div id="mention">
          <NavLink
            exact
            to="/MentionsLégales"
          >
            <h3>
              FreeWorld - Mentions légales
            </h3>
          </NavLink>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  sendFooter: PropTypes.func.isRequired,
};
/**
* Export
*/
export default Footer;
