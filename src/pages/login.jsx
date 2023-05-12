import { useState } from "react"
import { useLogin } from "@/hooks/useLogin"


const login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {handleLogin, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin(email, password)
  }

  return (
    <form className="login shadow" onSubmit={handleSubmit}>
      <h2 className="text-center fw-bold mb-4">Log In</h2>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <div className="row">
        <button className="btn btn-dark btn-lg fw-bold" disabled={isLoading}>Log in</button>
      </div>
      
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default login