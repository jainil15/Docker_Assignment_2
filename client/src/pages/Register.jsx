import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try
    {
      const res = await axios.post("auths/register", inputs)
      navigate('/login')
    }
    catch(err) {
      setError(err.response.data)
    }
  }



  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input type='text' name='username' id='username' onChange={handleChange} placeholder="username" />
        <input type='email' name='email' id='email' onChange={handleChange} placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
          {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login" >Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register

