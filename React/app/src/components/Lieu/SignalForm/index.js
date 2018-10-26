import React from 'react';
import Button from '@material-ui/core/Button';
import TextArea from 'src/containers/TextArea';

const SignalForm = () => (
  <div>
    <form>
      <TextArea name="complain" placeholder="Rentrez les informations"/>
      <Button variant="contained" className="pagelieu-button">
        Envoyer
      </Button>
    </form>
  </div>
);

export default SignalForm;
