/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './auth'

export default function ProtectedRoute({ component: Component, ...rest }) {
  const auth = useAuth()
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}
