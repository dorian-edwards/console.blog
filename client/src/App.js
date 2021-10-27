import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ProvideAuth } from './auth'
import Nav from './Components/Nav/Nav'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import UserPage from './Components/User/UserPage'
import Post from './Components/Post/Post'
import CreatePost from './Components/Post/CreatePost'
import EditPost from './Components/Post/EditPost'
import EditUser from './Components/User/EditUser'
import PageNotFound from './Components/PageNotFound/PageNotFound'
import PasswordReset from './Components/Password/PassReset'
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
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <ProtectedRoute path="/profile" component={UserPage} />
            <ProtectedRoute exact path="/posts/new" component={CreatePost} />
            <Route exact path="/posts/:id" component={Post} />
            <ProtectedRoute path="/posts/:id/edit" component={EditPost} />
            <ProtectedRoute exact path="/users/:id" component={UserPage} />
            <ProtectedRoute path="/users/:id/edit" component={EditUser} />
            <ProtectedRoute path="/users/:id/reset" component={PasswordReset} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </ProvideAuth>
  )
}
