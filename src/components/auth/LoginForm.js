import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { login, logout } from "../../firebase/functions";
import "./Modal.scss";
import Input from "../Input";
import { usersFb } from "../../firebase/firebase";
import firebase from "firebase";

const LoginForm = ({ setLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(false);

  useEffect(() => {
    let isUnmount = false;
    if (!isUnmount) {
      firebase.auth().onAuthStateChanged(
        authState =>
          authState &&
          authState.uid &&
          firebase
            .database()
            .ref("/users/" + authState.uid)
            .once("value")
            .then(snapshot => {
              const userData = snapshot.val() && snapshot.val().info;
              setUser(userData);
              !userData.phone ? logout() : setLoginModal(false);
            })
      );
    }
    return () => {
      isUnmount = true;
    };
  }, [firebase.auth]);

  const fblogin = () => {
    login(email, password);
  };

  const closeModal = () => {
    if (user && !user.phone) logout();
    setLoginModal(false);
  };

  const updateUser = () => {
    const uid = user.uid;
    if (user && !user.phone)
      usersFb
        .child(uid)
        .child("info")
        .update({ phone });
    login(email, password);
    setLoginModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={closeModal}
          title={user && !user.phone ? "Pozor, nebudeš přihlášen!" : ""}
        >
          &times;
        </span>

        <div className="form">
          <div className="info-text">
            Pro přihlášení použij stejné přihlašovací údaje, jako do deníčku výstupů. Pokud ještě
            registrovaný nejsi, registruj se. Pokud si nepamatuješ heslo, obnov si ho.
          </div>
          <Input
            handleChange={e => setEmail(e.target.value)}
            value={email}
            label="Email"
            type="email"
            disabled={user && !user.phone}
            required={true}
            name="email"
          />
          <Input
            handleChange={e => setPassword(e.target.value)}
            value={password}
            label="Heslo"
            disabled={user && !user.phone}
            required={true}
            name="password"
          />
          {user && !user.phone && (
            <div>Pokud si chceš něco rezervovat ze skladu, je nutné doplnit telefonní číslo</div>
          )}
          {user && !user.phone && (
            <Input
              handleChange={e => setPhone(e.target.value)}
              value={phone}
              label="Tel. číslo"
              required={true}
            />
          )}
          {
            <button className="modal-button" onClick={fblogin} disabled={user && !user.phone}>
              Přihlásit
            </button>
          }
          {user && !user.phone && (
            <button className="modal-button" onClick={updateUser}>
              Doplnit profil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  setLoginModal: PropTypes.func
};
