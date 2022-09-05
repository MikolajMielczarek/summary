import React, { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = () => {

    }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
            <span>email:</span>
            <input
            required
            type="email"
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            value={email}
            />
        </label>
        <label>
            <span>password:</span>
            <input
            required
            type="password"
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            value={password}
            />
        </label>
        <button className='btn'>Login</button>
    </form>
      )
}
