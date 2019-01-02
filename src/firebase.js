import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDY1niiKZUOmsv905dtfZbTCkeA39fh1Bw",
  authDomain: "lokalka-sklad.firebaseapp.com",
  databaseURL: "https://lokalka-sklad.firebaseio.com",
  projectId: "lokalka-sklad",
  storageBucket: "lokalka-sklad.appspot.com",
  messagingSenderId: "909791499912"
};
firebase.initializeApp(config);

const ref = firebase.database().ref();
const firebaseAuth = firebase.auth;

const reservationsRef = ref.child("reservations/");

const Fb = {
  ref,
  firebaseAuth
};

export { Fb, reservationsRef };
