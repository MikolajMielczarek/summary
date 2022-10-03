import { useState } from "react"
import { useLogin } from "../hooks/useLogin"


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, isPending, error } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

  return (
    <section className="auth-form">
        <form className='auth-form__form' onSubmit={handleSubmit}>
            <h2 className='auth-form__title'>Login</h2>
            <div className="auth-form__login-container">
                <div className="auth-form__labels-container">
                    <label className='auth-form__input-container'>
                        <span className='auth-form__input-container-txt'>email:</span>
                        <input
                        className='auth-form__input-container-input'
                        required
                        type="email"
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                        value={email}
                        />
                    </label>
                    <label className='auth-form__input-container'>
                        <span className='auth-form__input-container-txt'>password:</span>
                        <input
                        className='auth-form__input-container-input'
                        required
                        type="password"
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        value={password}
                        />
                    </label>
                </div>
                { !isPending && <button className='auth-form__btn'>Login</button>}
                { isPending && <button className='auth-form__btn' disabled>Loading</button>}
                {error && <p className='auth-form__error'>{error}</p>}
            </div>
        </form>
    </section>
      )
}
