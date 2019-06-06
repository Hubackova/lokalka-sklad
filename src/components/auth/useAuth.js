import { useState, useEffect } from "react";
import firebase from "firebase";
import { usersFb } from "../../firebase/firebase";

function useAuth() {
  const INITIAL_STATE = {
    isAuth: false,
    user: { lokoId: "", phone: "", email: "", uid: "" }
  };

  const [authState, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(authState =>
      authState && authState.uid
        ? firebase
            .database()
            .ref("/users/" + authState.uid)
            .once("value")
            .then(snapshot => {
              const userData = snapshot.val() && snapshot.val().info;
              setState({ isAuth: true, user: userData });
            })
        : setState(INITIAL_STATE)
    );
  }, [firebase.auth]);

  return authState;
}

export default useAuth;
