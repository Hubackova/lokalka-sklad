import firebase from "firebase";

function login(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error));
}

function logout() {
  return firebase.auth().signOut();
}

function signIn(email, password, phone, name) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response);
      saveUser(email, firebase.auth().currentUser.uid, phone, name);
    })
    .catch((error) => console.log(error.message));
}

function saveUser(email, uid, phone, name) {
  return firebase.database().ref().child(`users/${uid}/info`).set({
    email,
    uid,
    phone,
    name,
  });
}

export { signIn, login, logout };
