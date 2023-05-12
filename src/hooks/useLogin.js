import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import Cookies from 'js-cookie'
import Router from 'next/router'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const handleLogin = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://127.0.0.1:8000/auth/login/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const user = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(user.non_field_errors)
    }
    if (response.ok) {
      Cookies.set("user", JSON.stringify(user));
      dispatch({type: 'LOGIN', payload: user})
      setIsLoading(false)
      Router.replace("/home");
    }
  }

  return { handleLogin, isLoading, error }
}