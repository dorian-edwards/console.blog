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

function App() {
  return (
    <Router forceRefresh>
      <Nav />
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
