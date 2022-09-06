import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useRegistration = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    //we have dispatch from useAuthContext and when it is cominng to dipatch it is fire authReducer - we pass action! - so we update our state!
    const { dispatch } = useAuthContext()

    const register = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            // register
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if(!res) {
                throw new Error('Could not complete registration')
            }

            // add display name to user
            await res.user.updateProfile({ displayName })

            //dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch(err) {
            if (!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)     
    }, [])

    return { register, isPending, error }
}