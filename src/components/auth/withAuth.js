import React, {
  useState,
  useEffect,
} from "react";
import firebase from "firebase";
import {UserContext} from "../../Contexts";

const withAuth = ({children}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      user ? setUser(user) : setUser(null);
    });
  });
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default withAuth;
