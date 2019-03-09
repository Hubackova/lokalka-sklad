import firebase from 'firebase'

function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error))
}

function logout() {
  return firebase.auth().signOut()
}

function signIn(email, password, id, phone) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response)
      return saveUser(email, firebase.auth().currentUser.uid, id, phone)
    })
    .catch((error) => alert(error))
}

function saveUser(email, uid, id, phone) {
  console.log("saveuser", email, uid, id, phone)
  return firebase.database().ref().child(`users/${uid}/info`)
    .set({
      email,
      uid,
      id,
      phone
    })
}

export {
  signIn,
  login,
  logout
};