// Import hooks
import { useState } from 'react'
import { useCookies } from 'react-cookie'

// Define the Auth component
const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)

  // Use state hook to manage component state
  const [isLogin, setIsLogIn] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)

  // Function to switch between login and signup views
  const viewLogin = (status) => {
    setError(null)
    setIsLogIn(status)
  }

  // Function to handle form submission
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    // Validate passwords if signing up
    if(!isLogin && password !== confirmPassword) {
      setError('The passwords have to match!')
      return
    }

    // Send request to server for login or signup
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()

    // Handle response from server
    if(data.detail){
      setError(data.detail)
    } else{
      // Set cookies and reload the page
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)
      window.location.reload()
    }
  }

    // Render the Auth component
    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{ isLogin ? 'Please log in' : 'Please sign up!'}</h2>
            <input type="email" placeholder="email" onChange={ (e) => setEmail(e.target.value) }/>
            <input type="password" placeholder="password" onChange={ (e) => setPassword(e.target.value) }/>
            { !isLogin && <input type="password" placeholder="confirm password" onChange={ (e) => setConfirmPassword(e.target.value) }/> }
            <input type="submit" className="create" onClick={ (e) => handleSubmit(e, isLogin ? 'login' : 'signup') }/>
            { error && <p>{error}</p> }
          </form>
          <div className="auth-options">
            <button onClick={ () => viewLogin(true) }
            style={ { backgroundColor : isLogin ? '#ffffff' : '#bcbcbc'} }
            >Login</button>
            <button onClick={ () => viewLogin(false) }
            style={ { backgroundColor : !isLogin ? '#ffffff' : '#bcbcbc'} }
            >Sign up</button>
          </div>
        </div>
      </div>
    )
  }
  
  // Export the Auth component
  export default Auth
  