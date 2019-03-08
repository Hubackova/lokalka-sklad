import React, {Component, createContext, useState, useEffect, useContext} from 'react'
import firebase from 'firebase'
import Reservation from './components/booking'
import AdminLayout from './components/manage'
import LoginForm from './components/auth/LoginForm'
//import withAuth from './components/auth/withAuth'
import {reservationsRef, Fb} from './firebase'
import './App.scss'
import 'font-awesome/css/font-awesome.min.css'

const App = () => {
  const [isAdmin, toggleAdmin] = useState(false)
  const [reservations, getReservations] = useState([])
  const [isReservation, switchReservations] = useState(true)

  useEffect(() => {
    reservationsRef.on('value', snapshot => {
      const items = []
      snapshot.forEach(child => {
        let childItem = child.val()
        childItem.key = child.key
        items.push(childItem)
      })
       getReservations(items)
    })
  }, [])

  // handleChange = e => {
  //   const reservations = reservations.filter(i => {
  //     return i.itemName.includes(e.target.value) || i.userId.includes(e.target.value)
  //   })
  //   this.setState({value: e.target.value, reservations}, () => {
  //     if (this.state.value === '') {
  //       this.fetchReservation()
  //     }
  //   })
  // }


  return (
    <div className="App">
    <LoginForm />

    {/* <div>{JSON.stringify(this.props.user && this.props.user.email)}</div> */}
    <div className="menu">
      <span onClick={() => switchReservations(true)}>Rezervace</span>
      {isAdmin && <span onClick={() => switchReservations(false)}>Správa rezervací</span>}
      <span onClick={() => toggleAdmin(!isAdmin)}>
        <i className={`fa fa-user${isAdmin ? ' admin' : ''}`} />
      </span>
    </div>
    {isReservation ? (
      <Reservation reservations={reservations} isAdmin={isAdmin} />
    ) : (
      <AdminLayout reservations={reservations}  /> //handleChange={this.handleChange}
    )}
  </div>
  );
};

export default App;

