import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import Cookies from 'js-cookie'
import Router from 'next/router'


export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (username,email,password,first_name,last_name,birthDate,gender,mobile) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://13.126.201.102:8000/auth/register/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username,email,password,first_name,last_name,birthDate,gender,mobile })
    })
    const data = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(JSON.stringify(data))
    }
    if (response.ok) {
      Cookies.set("user", JSON.stringify(data));
      dispatch({type: 'LOGIN', payload: data})
      setIsLoading(false)
      Router.replace("/complete-profile");
    }
  }

  return { signup, isLoading, error }
}