import { useAuthContext } from './useAuthContext'
import Cookies from 'js-cookie'
import Router from 'next/router'

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from storage
    Cookies.remove("user");

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    Router.replace("/login");
  }

  return { logout }
}