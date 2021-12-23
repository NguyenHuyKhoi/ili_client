import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user') || null)
}

export const AuthContext = createContext(reducer)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
        return () => {
            
        }
    }, [state.user])
    return <AuthContext.Provider
        value = {{
            user: state.user,
            token: state.user == null ? '' : state.user.accessToken,
            dispatch,
        }}>
        {
            children
        }
    </AuthContext.Provider>
}