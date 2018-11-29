/**
 * Npm import
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
/**
 * Local import
 */
import Commentaire from 'src/components/Lieu/Commentaire';
import CommentForm from 'src/containers/CommentForm';
import Arrow from 'react-icons/lib/fa/arrow-left';


/**
 * Code
 */
class Commentaires extends React.Component {
  state = {
    show: false,
  };

  // show the form ?
  showCommentForm = (evt) => {
    evt.preventDefault();
    this.setState({ show: !this.state.show });
  }
  render() {
    const { show } = this.state;
    if (this.props.posts) {
      // check if the current user has already posted
      const userPost = this.props.posts.map(post => post.Author);
      const didPost = userPost.some(user => user === this.props.currentUser)
      return (
        <div className="commentaires">
          <h5>Avis</h5>
          {(show) ?
            <div className="pagelieu-block-signal-form" >
              <Arrow
                onClick={this.showCommentForm}
                className="buttonplus-icon"
              />
              {this.props.logged ?
                <div>
                  {didPost ?
                    <p>Vous avez déjà donné votre avis</p>
                    :
                    <CommentForm />
                  }
                </div>
              :
                <p>
                  <NavLink exact to="/Login" className="link">Connectez-vous </NavLink>
                   ou
                  <NavLink exact to="Signup" className="link"> créez un compte </NavLink>
                  pour laisser un commentaire !
                </p>
              }
            </div>
            :
            <div>
              <button onClick={this.showCommentForm} variant="contained">
                Donner son avis
              </button>
            </div>
          }
          {
            this.props.posts.map(com => (
              <Commentaire com={com} key={com.Id} />
            ))
          }
        </div>
      );
    }
    return (
      <div className="commentaires">
        <h5>Avis</h5>
        {(show) ?
          <div className="pagelieu-block-signal-form" >
            <Arrow
              onClick={this.showCommentForm}
              className="buttonplus-icon"
            />
            {this.props.logged ?
              <CommentForm />
            :
              <p>
                <NavLink exact to="/Login" className="link">Connectez-vous</NavLink>
                 ou
                 <NavLink exact to="Signup" className="link">créez un compte</NavLink>
                  pour laisser un commentaire !
              </p>
            }
          </div>
          :
          <div>
            <p>Il n'y a pas encore de commentaires pour ce lieu.</p>
            <button onClick={this.showCommentForm} variant="contained">
              Donner son avis
            </button>
          </div>
        }
      </div>
    );
  }
}

Commentaires.propTypes = {
  logged: PropTypes.bool.isRequired,
};
/**
 * Export
 */
export default Commentaires;
