import { createContext, useReducer, useEffect } from 'react'
import Cookies from 'js-cookie'
export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })
  useEffect(() => {
    const user = Cookies.get("user")
    if (user) {
      const ParsedUser = JSON.parse(user)
      dispatch({ type: 'LOGIN', payload: ParsedUser }) 
    }
  }, [])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}