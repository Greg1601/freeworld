import React from 'react';
import FieldInput from 'src/containers/FieldInput';
import SubmitButton from 'src/components/Form/SubmitButton';
import TextArea from 'src/components/Form/TextArea';
import MultipleSelect from 'src/containers/MultipleSelect';
import Arrow from 'react-icons/lib/fa/arrow-left';
import PropTypes from 'prop-types';

const FormEditProfil = ({ changeState }) => (
  <div className="Formeditprofil">
    <Arrow
      onClick={changeState('profil')}
      className="buttonplus-icon"
    />
    <form>
      <FieldInput
        name="newname"
        placeholder="Entrez un pseudo"
        type="text"
      />
      <FieldInput
        name="newadress"
        placeholder="Entrez une adresse"
        type="text"
      />
      <TextArea />
      <MultipleSelect name="newuserinterests" />
      <SubmitButton />
    </form>
  </div>
);

FormEditProfil.propTypes = {
  changeState: PropTypes.func.isRequired,
};

export default FormEditProfil;
