import { useState } from 'react'
import { useRegistration } from '../hooks/useRegistration'

export default function Registration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [city, setCity] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [avatarError, setAvatarError] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnaiError] = useState(null)

    const { register, isPending, error } = useRegistration()

    const handleSubmit = (e) => {
        e.preventDefault()
        register(email, password, displayName)
    }

   /* const handleFileChange = (e) => {
        setAvatar(null)
        let selected = e.target.files[0]

        if(!selected){
            setAvatarError('Please select file')
            return
        }
        if(!selected.type.includes('image')){
            setAvatarError('Selected file must be an image')
            return
        }
        if (selected.size > 100000){
            setAvatarError('Image file size must be less than 100kb')
            return
        }
        setAvatarError(null)
        setAvatar(selected)
    }
    */
  return (
    <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <label>
            <span>email:</span>
            <input 
            required
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            />
        </label>
        <label>
            <span>password:</span>
            <input 
            required
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            />
        </label>
        <label>
            <span>display name:</span>
            <input 
            required
            type="text"
            onChange={(e)=> setDisplayName(e.target.value)}
            value={displayName}
            />
        </label>
        
        {!isPending && <button className='btn'>Register</button>}
        {isPending && <button className='btn' disabled>Loading</button>}
        {error && <p>{error}</p>}
    </form>
      )
}

/*
<label>
            <span>city:</span>
            <input 
            required
            type="text"
            onChange={(e)=> setCity(e.target.value)}
            value={city}
            />
        </label>
        <label>
            <span>profile avatar:</span>
            <input 
            required
            type="file"
            onChange={handleFileChange}
            />
            {avatarError && <div className='error'>{avatarError}</div>}

        </label>
*/