import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBynEwbzJ4zpJB34zr0Kd1ejhmr0lSufUs",
  authDomain: "climbingdiary-a3ae5.firebaseapp.com",
  databaseURL: "https://climbingdiary-a3ae5.firebaseio.com",
  projectId: "climbingdiary-a3ae5",
  storageBucket: "climbingdiary-a3ae5.appspot.com",
  messagingSenderId: "319637312803",
  appId: "1:319637312803:web:1269b27e64a8309e"
};

firebase.initializeApp(config);

const ref = firebase.database().ref();
const reservationsFb = ref.child("reservations/");
const usersFb = ref.child("users/");

export { reservationsFb, usersFb };
