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
    opinion: '',
    errors: {},
  }

  // if click on ThumbUp
  Up = () => {
    const { errors } = this.state;
    this.setState({
      vote: 1,
      opinion: 'oui',
      clicked: true,
      errors: {
        ...errors,
        opinion: null,
      },
    });
  }

  // if click on ThumbUp
  Down = () => {
    const { errors } = this.state;
    this.setState({
      vote: 0,
      opinion: 'non',
      clicked: true,
      errors: {
        ...errors,
        opinion: null,
      },
    });
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { comment, titlecomment, userId, placeId } = this.props;
    const { vote, opinion } = this.state;
    const errors = this.validate(comment, titlecomment, opinion);
    if (Object.keys(errors).length > 0) {
      return this.setState({ errors });
    }
    this.setState({ errors: [], submitted: true });
    return this.props.sendComment(comment, titlecomment, userId, placeId, vote);
  }


  validate = (comment, titlecomment, opinion) => {
    const errors = {};
    if (comment.length === 0) {
      errors.comment = 'Veuillez écrire un commentaire';
    }
    if (titlecomment.length === 0) {
      errors.titlecomment = 'Veuillez donner un titre';
    }
    if (opinion.length === 0) {
      errors.opinion = 'Veuillez cliquer sur un pouce';
    }
    return errors;
  }

  handleBlur = prop => (evt) => {
    const { errors } = this.state;
    this.setState({
      errors: {
        ...errors,
        [prop]: null,
      },
    });
  }
  render() {
    const { placeId } = this.props;
    if (!this.state.submitted) {
      return (
        <div className="commentForm" data={placeId}>
          <form onSubmit={this.handleSubmit} className="commentForm-form">
            <div className="rating-vote">
              <ThumbDown onClick={this.Down} className="material-icons rating-vote-icon" name={placeId} />
              <ThumbUp onClick={this.Up} className="material-icons rating-vote-icon" name={placeId} />
              <p>Êtes-vous satisfait de l'accessibilité du lieu ?</p>
              {(this.state.clicked) ?
                <div>
                  <div className="rating-vote-clicked" />
                  <p>Vous avez voté {this.state.opinion}</p>
                </div>
                :
                <div>
                  { this.state.errors.opinion ?
                    <span style={{ color: 'red' }}>{this.state.errors.opinion}</span>
                    :
                    null
                  }
                </div>
              }
            </div>
            <div onBlur={this.handleBlur('titlecomment')}>
              <FieldInput
                name="titlecomment"
                placeholder="Donnez un titre à votre commentaire"
                type="text"
                className={this.state.errors.titlecomment ? 'error' : null}
              />
              { this.state.errors.titlecomment ?
                <span style={{ color: 'red' }}>{this.state.errors.titlecomment}</span>
                :
                null
              }
            </div>
            <div onBlur={this.handleBlur('comment')}>
              <TextArea
                name="comment"
                placeholder="Ecrivez votre commentaire"
                className={this.state.errors.comment ? 'error' : null}
              />
              { this.state.errors.comment ?
                <span style={{ color: 'red' }}>{this.state.errors.comment}</span>
                :
                null
              }
            </div>
            <button variant="contained" className="pagelieu-button commentForm-button">
              Envoyer
            </button>
          </form>
        </div>
      );
    }
    return (
      <div>
        Thank You
      </div>
    );
  }
}

CommentForm.propTypes = {
  sendComment: PropTypes.func.isRequired,
};


export default CommentForm;
