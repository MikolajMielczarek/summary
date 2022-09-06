import { createContext, useReducer } from "react";

// context stored in AuthContext 1.
export const AuthContext = createContext()

//3. authReducer

export const authReducer = (state, action) => {
    switch(action.type) {
        
        case 'LOGIN': 
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }


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
        user: null
    })

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )

}