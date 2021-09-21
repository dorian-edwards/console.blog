import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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

const data = {
  _id: '612c478f7d99e8115c939cc5',
  firstName: 'dorian',
  lastName: 'edwards',
  email: 'dorian@gmail.com',
  username: 'breh',
  img: 'assets/img/profilePic.jpg',
}

function App() {
  return (
    <Router>
      <Nav />
      <div id="main">
        <Home />
      </div>
    </Router>
  )
}

export default App
