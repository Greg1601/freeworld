import React from 'react';
import PropTypes from 'prop-types';
import ThumbUp from 'react-icons/lib/md/thumb-up';
import ThumbDown from 'react-icons/lib/md/thumb-down';
import Button from '@material-ui/core/Button';
import TextArea from 'src/containers/TextArea';
import FieldInput from 'src/containers/FieldInput';

class CommentForm extends React.Component {
  static defaultProps = {
    comment: '',
    titlecomment: '',
    clicked: false,
  }
  static propTypes = {
    comment: PropTypes.string,
    titlecomment: PropTypes.string,
    clicked: PropTypes.bool,
  }
  state = {
  }
  Up = () => {
    this.setState({ vote: 1, clicked: true });
  }
  Down = () => {
    this.setState({ vote: 0, clicked: true });
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { comment, titlecomment, userId, placeId } = this.props;
    const { vote } = this.state;
    if (titlecomment === '' || comment === '' || this.state.clicked === false) {
      this.setState({ error: true });
    } this.setState({ error: false });

    if (!this.state.error) {
      this.props.sendComment(comment, titlecomment, userId, placeId, vote);
    }
  }
  render() {
    const { placeId } = this.props;
    console.log(this.props)
    return (
      <div className="commentForm" data={placeId}>
        <form onSubmit={this.handleSubmit} className="commentForm-form">
          <div className="rating-vote">
            <ThumbDown onClick={this.Down} className="material-icons rating-vote-icon" name={placeId} />
            <ThumbUp onClick={this.Up} className="material-icons rating-vote-icon" name={placeId} />
            <p>Êtes-vous satisfait de l'accessibilité du lieu ?</p>
            {(this.state.clicked) ?
              <div>
                <div className="rating-vote-clicked"></div>
                <p>Vous avez voté {this.state.opinion}</p>
              </div>
              :
              null
            }
          </div>
          <FieldInput
            name="titlecomment"
            placeholder="Donnez un titre à votre commentaire"
            type="text"
          />
          <TextArea name="comment" placeholder="Ecrivez votre commentaire" />
          <button variant="contained" className="pagelieu-button commentForm-button">
            Envoyer
          </button>
        </form>
        {
          this.state.error ?
            <p style={{ color: 'red' }}>Veuillez remplir tous les champs !</p>
        :
          null
        }
      </div>
    );
  }
}

CommentForm.propTypes = {
  sendComment: PropTypes.func.isRequired,
};


export default CommentForm;
