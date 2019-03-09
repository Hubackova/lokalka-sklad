import React, {
  useState,
  useEffect,
} from "react";
import firebase from "firebase";
import {UserContext} from "../../Contexts";

const withAuth = ({children}) => {
  const [authState, setState] = useState({
    isLoading: true,
    user: null
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authState =>
      setState({ isLoading: false, user: authState })
    );
    return unsubscribe;
  }, [firebase.auth]);

  return <UserContext.Provider value={authState}>{children}</UserContext.Provider>;
};

export default withAuth;



