import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { useState, useEffect } from 'react'
import axios from 'axios'

import Nav from './Components/Nav/Nav'
import Home from './Components/Home/Home'
import UserPage from './Components/User/UserPage'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import Post from './Components/Post/Post'
import EditPost from './Components/Post/EditPost'
import EditUser from './Components/User/EditUser'

/**
 * The following to components are here for testing, they'll be removed on deployment
 */

import User from './Components/User/User'
import Display from './Components/Display/Display'
import './App.css'

function App() {
  const [loggedIn, setLogin] = useState(false)
  const [id, setId] = useState('')

  useEffect(async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1', {
        withCredentials: true,
      })
      const { data } = res.data
      if (data) {
        setLogin(true)
        setId(data._id)
      }
    } catch (err) {
      // todo
    }
  }, [loggedIn])

  const signOut = async () => {
    try {
      const data = await axios.get('http://localhost:8080/api/v1/signout', {
        withCredentials: true,
      })
      if (data) setLogin(false)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log({ err })
    }
  }

  return (
    <Router forceRefresh>
      <Nav loggedIn={loggedIn} signOut={signOut} userId={id} />
      <div id="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts/:id" component={Post} />
          <Route exact path="/users/:id" component={UserPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
