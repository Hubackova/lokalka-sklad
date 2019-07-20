import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { login, logout } from "../../firebase/functions";
import "./Modal.scss";
import Input from "../Input";
import { UserContext } from "../../Contexts";
import { usersFb } from "../../firebase/firebase";

const LoginForm = ({ setLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lokoId, setLokoId] = useState("");
  const [phone, setPhone] = useState("");

  const { isAuth, user } = useContext(UserContext);

  const missingData = isAuth && (!user.lokoId || !user.phone);

  const fblogin = () => {
    login(email, password);
    setLoginModal(false);
  };

  const closeModal = () => {
    if (missingData) logout();
    setLoginModal(false);
  };

  const updateUser = () => {
    const uid = user.uid;
    debugger;
    if (!user.phone)
      usersFb
        .child(uid)
        .child("info")
        .update({ phone });
    if (!user.lokoId)
      usersFb
        .child(uid)
        .child("info")
        .update({ lokoId });
    setLoginModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={closeModal}
          title={missingData ? "Pozor, nebudeš přihlášen!" : ""}
        >
          &times;
        </span>

        <form className="form">
          <div className="info-text">
            Pro přihlášení použij stejné přihlašovací údaje, jako do deníčku výstupů. Pokud ještě
            registrovaný nejsi, registruj se. Pokud si nepamatuješ heslo, obnov si ho.
          </div>
          <Input
            handleChange={e => setEmail(e.target.value)}
            value={email}
            label="Email"
            type="email"
            disabled={missingData}
            required={true}
            name="email"
          />
          <Input
            handleChange={e => setPassword(e.target.value)}
            value={password}
            label="Heslo"
            disabled={missingData}
            required={true}
            name="password"
          />
          {missingData && (
            <div>Pokud si chceš něco rezervovat ze skladu, je nutné doplnit tyto údaje</div>
          )}
          {isAuth && !user.lokoId && (
            <Input
              handleChange={e => setLokoId(e.target.value)}
              value={lokoId}
              label="ID: "
              required={true}
            />
          )}
          {isAuth && !user.phone && (
            <Input
              handleChange={e => setPhone(e.target.value)}
              value={phone}
              label="Tel. číslo"
              required={true}
            />
          )}
          {!missingData && (
            <button className="modal-button" onClick={fblogin}>
              Přihlásit
            </button>
          )}
          {missingData && (
            <button className="modal-button" onClick={updateUser} type="submit">
              Doplnit profil
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  setLoginModal: PropTypes.func
};
