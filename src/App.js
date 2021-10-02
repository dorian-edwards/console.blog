import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ProvideAuth } from './auth'
import Nav from './Components/Nav/Nav'
import Home from './Components/Home/Home'
import UserPage from './Components/User/UserPage'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import Post from './Components/Post/Post'
import ProtectedRoute from './Protected'

import './App.css'

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Nav />
        <div id="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts/:id" component={Post} />
            <ProtectedRoute path="/users/:id">
              <UserPage />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <UserPage />
            </ProtectedRoute>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  )
}
