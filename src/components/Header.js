import React, { useState, useContext } from "react";
import logo from "../imgs/lokalka.png";
import hudy from "../imgs/hudy.png";
import { logout } from "../firebase/functions";
import LoginForm from "./auth/LoginForm";
import SignInForm from "./auth/SignInForm";
import { UserContext } from "../Contexts";
import "./Header.scss";

const Header = ({ setIsReservation }) => {
  const [loginModal, setLoginModal] = useState(false);
  const [registrationModal, setRegistrationModal] = useState(false);
  const { isAuth, user } = useContext(UserContext);
  const fblogout = () => {
    logout();
  };
  const isAdmin =
    user.uid === "9AmWsb1PbcgIPTynkHvsYco5XLB3" || user.uid === "Xs0w4MJr5xakWA4XBtAVAhawqzI3";
  return (
    <>
      <header className="main-header">
        <div>
          <img src={logo} alt="Lokalka.eu" />
          {isAdmin && <img src={hudy} alt="Hudy" />}
        </div>

        <nav className="main-nav">
          <ul className="main-nav-list">
            {isAuth && (
              <li onClick={() => setIsReservation(true)}>
                <span>Rezervace</span>
                <i className="fa fa-calendar" title={"Rezervace"} />
              </li>
            )}
            {isAuth && (
              <li onClick={() => setIsReservation(false)}>
                <span>Správa rezervací</span>
                <i className="fa fa-list-alt" title={"Správa rezervací"} />
              </li>
            )}
            {isAuth && (
              <li onClick={fblogout}>
                <i className="fa fa-sign-out" title={`Odhlásit uživatele ${user.email}`} />
              </li>
            )}
            {!isAuth && (
              <li onClick={() => setLoginModal(true)}>
                <span>Přihlásit se</span>
                <i className="fa fa-user-circle" title={"Přihlásit se"} />
              </li>
            )}
            {!isAuth && (
              <li onClick={() => setRegistrationModal(true)}>
                <span>Registrovat se</span>
                <i className="fa fa-user-plus" title={"Registrovat se"} />
              </li>
            )}
          </ul>
        </nav>
      </header>
      {loginModal && <LoginForm setLoginModal={setLoginModal} />}
      {registrationModal && <SignInForm setRegistrationModal={setRegistrationModal} />}
    </>
  );
};

export default Header;
