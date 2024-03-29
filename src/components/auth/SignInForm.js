import React, { useState } from "react";
import PropTypes from "prop-types";
import { signIn } from "../../firebase/functions";
import { parsePhoneNumberFromString as parseMin } from "libphonenumber-js";
import "./Modal.scss";
import Input from "../Input";
import Button from "../Button";

const SignInForm = ({ setRegistrationModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const fbSignIn = async (e) => {
    e.preventDefault();
    await signIn(email, password, phone.replace(/\s/g, ""), name);
    setRegistrationModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setRegistrationModal(false)}>
          &times;
        </span>

        <form className="form" onSubmit={fbSignIn}>
          <div className="info-text">
            Pokud už jsi registrován v deníčku výstupů, použij stejné
            přihlašovací údaje. Pokud si nepamatuješ heslo, v přihlašovacím
            formuláři si ho můžeš obnovit.
            <div>
              Pro nápovědu jak rezervační systém funguje, koukni na web lokálky
              - stačí kliknout na logo lokálky vlevo nahoře
            </div>
          </div>
          <Input
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
            type="email"
            required={true}
          />
          <Input
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            label="Heslo"
            required={true}
          />
          <Input
            handleChange={(e) => setPhone(e.target.value)}
            value={phone}
            label="Tel. číslo (včetně předvolby +420/+421)"
            required={true}
          />
          <Input
            handleChange={(e) => setName(e.target.value)}
            value={name}
            label="Jméno a příjmení"
            required={true}
          />
          <Button
            color="green"
            type="submit"
            icon="plus"
            disabled={
              !name || !phone || !(parseMin(phone) && parseMin(phone).isValid())
            }
            title={
              !(parseMin(phone) && parseMin(phone).isValid()) &&
              "zadej číslo v požadovaném formátu"
            }
          >
            Registrovat
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

SignInForm.propTypes = {
  setRegistrationModal: PropTypes.func,
};
