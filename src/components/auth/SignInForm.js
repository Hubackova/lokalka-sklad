import React, { useState } from "react";
import PropTypes from "prop-types";
import { signIn } from "../../firebase/functions";
import "./Modal.scss";
import Input from "../Input";

const SignInForm = ({ setRegistrationModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");

  const fbSignIn = () => {
    signIn(email, password, id, phone);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setRegistrationModal(false)}>
          &times;
        </span>
        
        <form className="form">
        <div className="info-text">Pokud už jsi registrován v deníčku výstupů, použij stejné přihlašovací údaje. Pokud si nepamatuješ heslo, v přihlašovacím formuláři si ho můžeš obnovit.</div>
          <Input
            handleChange={e => setEmail(e.target.value)}
            value={email}
            label="Email"
            type="email"
            required={true}
          />
          <Input handleChange={e => setPassword(e.target.value)} value={password} label="Heslo" required={true}/>
          <Input handleChange={e => setId(e.target.value)} value={id} label="ID" required={true}/>
          <Input handleChange={e => setPhone(e.target.value)} value={phone} label="Tel. číslo" required={true}/>
          <button className="modal-button" onClick={fbSignIn} type="submit">
            Registrovat
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

SignInForm.propTypes = {
  setRegistrationModal: PropTypes.func
};
