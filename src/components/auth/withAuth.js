import React, {Component, createContext, useState, useEffect, useContext} from 'react'
import firebase from 'firebase'

const withAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      user ? setUser(user) : console.log('something is wrong')
    })
  }, [user])

  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
}

export default withAuth
