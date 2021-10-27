/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState, createContext, useContext, useEffect } from 'react'

const baseUrl = '/api/v1/'

const authContext = createContext() // <= create my context object

const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(async () => {
    const res = await axios.get(baseUrl, { withCredentials: true })
    const { data } = res.data
    if (data) {
      setUser(data)
    }
  }, [])

  const login = async (email, password) => {
    const res = await axios.post(
      `${baseUrl}login`,
      { email, password },
      { withCredentials: true }
    )
    const { data } = res.data
    if (data) {
      setUser(data)
    }
  }

  const signOut = async () => {
    const data = await axios.get(`${baseUrl}signout`, { withCredentials: true })
    if (data) {
      setUser(false)
    }
  }

  return { user, login, signOut }
}

export const useAuth = () => useContext(authContext)

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
