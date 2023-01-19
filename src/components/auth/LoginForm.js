import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { parsePhoneNumberFromString as parseMin } from "libphonenumber-js";
import { login, logout } from "../../firebase/functions";
import "./Modal.scss";
import Input from "../Input";
import Button from "../Button";
import { usersFb } from "../../firebase/firebase";

const LoginForm = ({ setLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    let isUnmount = false;
    if (!isUnmount) {
      firebase.auth().onAuthStateChanged(
        (authState) =>
          authState &&
          authState.uid &&
          firebase
            .database()
            .ref("/users/" + authState.uid)
            .once("value")
            .then((snapshot) => {
              const userData = snapshot.val() && snapshot.val().info;
              setUser(userData);
              !userData.phone || !userData.name
                ? logout()
                : setLoginModal(false);
            })
      );
    }
    return () => {
      isUnmount = true;
    };
  }, [firebase.auth]);

  const handleResetPassword = () => {
    const auth = firebase.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fblogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const closeModal = () => {
    if (user && (!user.phone || !user.name)) logout();
    setLoginModal(false);
  };

  const updateUser = () => {
    const uid = user.uid;
    let updateObj;
    if (phone) updateObj = { phone: phone.replace(/\s/g, "") };
    if (name) updateObj = { ...updateObj, name };
    if (user && (!user.phone || !user.name))
      usersFb.child(uid).child("info").update(updateObj);
    login(email, password);
    setLoginModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={closeModal}
          title={
            user && (!user.phone || !user.name)
              ? "Pozor, nebudeš přihlášen!"
              : ""
          }
        >
          &times;
        </span>

        <form className="form" onSubmit={fblogin}>
          {!user && (
            <div className="info-text">
              Pro přihlášení použij stejné přihlašovací údaje, jako do deníčku
              výstupů. Pokud ještě registrovaný nejsi, registruj se.
              <div>
                Pokud jsi zapomněl heslo, zadej svůj email a klikni
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={handleResetPassword}
                >
                  {" "}
                  SEM
                </span>
                . Na email ti dojde link pro změnu hesla.
              </div>
              <div>
                Pro nápovědu jak rezervační systém funguje, koukni na web
                lokálky - stačí kliknout na logo lokálky vlevo nahoře
              </div>
              {emailSent && (
                <div
                  style={{ textAlign: "center", color: "red", paddingTop: 10 }}
                >
                  Email odeslán
                </div>
              )}
            </div>
          )}
          <Input
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
            type="email"
            disabled={user && (!user.phone || !user.name)}
            required={true}
            name="email"
          />
          <Input
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            label="Heslo"
            type="password"
            disabled={user && (!user.phone || !user.name)}
            required={true}
            name="password"
          />
          {user && !user.phone && (
            <div className="info-text">
              Pokud si chceš něco rezervovat ze skladu,{" "}
              <b>je nutné doplnit telefonní číslo</b>
            </div>
          )}
          {user && !user.name && (
            <div className="info-text">
              Pokud si chceš něco rezervovat ze skladu,{" "}
              <b>je nutné doplnit jméno</b>
            </div>
          )}
          {user && !user.phone && (
            <Input
              handleChange={(e) => setPhone(e.target.value)}
              value={phone}
              label="Tel. číslo (včetně předvolby)"
            />
          )}
          {user && !user.name && (
            <Input
              handleChange={(e) => setName(e.target.value)}
              value={name}
              label="Jméno a příjmení"
              required={true}
            />
          )}
          {
            <Button
              color="green"
              type="submit"
              icon="paper-plane"
              disabled={user && (!user.phone || !user.name)}
            >
              Přihlásit
            </Button>
          }
          {user && (!user.phone || !user.name) && (
            <Button
              color="blue"
              type="submit"
              icon="phone"
              onClick={updateUser}
              disabled={
                (!user.name && !name) ||
                (!user.phone &&
                  (!phone || !(parseMin(phone) && parseMin(phone).isValid())))
              }
              title={
                !(parseMin(phone) && parseMin(phone).isValid()) &&
                "zadej číslo v požadovaném formátu"
              }
            >
              Doplnit profil
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  setLoginModal: PropTypes.func,
};
