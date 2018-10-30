import React from 'react';
// import Upload from 'src/components/Form/Upload';
import PropTypes from 'prop-types';
import FieldInput from 'src/containers/FieldInput';
import MultipleSelect from 'src/containers/MultipleSelect';
import TextArea from 'src/containers/TextArea';
import SubmitButton from 'src/components/Form/SubmitButton';
import { Redirect } from 'react-router-dom';

class Signup extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const {
      username,
      email,
      password,
      description,
      city,
    } = this.props;
    console.log(this.props);
    this.props.signupRequest(username, email, password, description, city);
  }
  render() {
    if (this.props.response) {
      return <Redirect push to="/" />;
    }

    return (
      <div className="signup">
        <form onSubmit={this.handleSubmit}>
          <FieldInput
            name="username"
            placeholder="Entrez un pseudonyme"
            type="text"
          />
          <FieldInput
            name="email"
            placeholder="Entrez votre adresse email"
            type="email"
          />
          <FieldInput
            name="password"
            placeholder="Entrez un mot de passe"
            type="password"
          />
          <FieldInput
            name="description"
            placeholder="description"
            type="text"
          />
          <FieldInput
            name="city"
            placeholder="ville"
            type="text"
          />
          <SubmitButton />
        </form>
      </div>
    );
  }
}

Signup.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  // presentation: PropTypes.string.isRequired,
  // userinterests: PropTypes.string.isRequired,
};

export default Signup;
