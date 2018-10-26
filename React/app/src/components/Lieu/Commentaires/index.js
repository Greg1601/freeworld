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
    const { show } = this.state;
    // const { comments } = this.props;
    // if (!comments) {
    //   this.props.getComments():
    // }
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
        {(this.props.comments) ?
          this.props.comments.map(com => (
            <Commentaire com={com} />
          )) : ''}
      </div>
    );
  }
}

/**
 * Export
 */
export default Commentaires;
