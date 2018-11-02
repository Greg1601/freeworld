/**
 * Npm import
 */
import React from 'react';
import Commentaire from 'src/components/Lieu/Commentaire';
import CommentForm from 'src/containers/CommentForm';
import Arrow from 'react-icons/lib/fa/arrow-left';
/**
 * Local import
 */


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
              <CommentForm />
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
      )
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
            <button onClick={this.showCommentForm} variant="contained">
              Donner son avis
            </button>
          </div>
        }
        <p>Il n'y a pas encore de commentaires pour ce lieu</p>
      </div>
    )
  }
}

/**
 * Export
 */
export default Commentaires;
