import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

// context stored in AuthContext 1.
export const AuthContext = createContext()

//3. authReducer

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN': 
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state
    }
}

// custom component which will wrap context provider
// children represents whatever AuthContextProvider will wrap in our case App component
export const AuthContextProvider = ({ children }) => {

    //reducer function 2.
    // allow us to useReducer function to control the states, whenever we want to update the state using authReducer we dispatch an action and that will update state!
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    //onAuthStateChange function which going to comunicate with firebase and ask if there is change in authentication if yes it is fire that function:) we check if there is user and we pass that user value it is user or null.
    // because unsub() we unsubscribe this function so it is not fire in the future
    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: 'AUTH_IS_READY', payload: user })
            unsub()
        })
    }, [])
    console.log('AuthContext state', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}