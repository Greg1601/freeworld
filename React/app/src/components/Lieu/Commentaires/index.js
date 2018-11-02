/**
 * Npm import
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
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
  showCommentForm = (evt) => {
    evt.preventDefault();
    this.setState({ show: !this.state.show });
  }
  render() {
    // console.log(typeof this.props.comments)
    const { show } = this.state;
    // const { comments } = this.props;
    // if (!comments) {
    //   this.props.getComments():
    // }
    if (!this.props.comments) {
      this.props.getComment(this.props.placeId);
    }
    else if (this.props.comments) {
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
                   <NavLink exact to="Signup" className="link">créez</NavLink> un compte.
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
            this.props.comments.map(com => (
              <Commentaire com={com} />
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
            <CommentForm />
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
    )
  }
}

/**
 * Export
 */
export default Commentaires;
