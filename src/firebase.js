import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBynEwbzJ4zpJB34zr0Kd1ejhmr0lSufUs",
  authDomain: "climbingdiary-a3ae5.firebaseapp.com",
  databaseURL: "https://climbingdiary-a3ae5.firebaseio.com",
  projectId: "climbingdiary-a3ae5",
  storageBucket: "climbingdiary-a3ae5.appspot.com",
  messagingSenderId: "319637312803"
};

firebase.initializeApp(config);

const ref = firebase.database().ref();
const reservationsRef = ref.child("reservations/");

function login(email, pw) {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
    .catch((error) => alert(error))
}

function logout() {
  return firebase.auth().signOut()
}

function signIn(email, pw) {
  return firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => alert(error))
}

function saveUser(user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

const Fb = {
  ref,
  signIn,
  login,
  logout
};

export { Fb, reservationsRef };
