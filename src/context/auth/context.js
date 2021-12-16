import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user') || null) ,
    isLoading: false,
    message: "",
    isSuccess: false
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
            message: state.message,
            isLoading: state.isLoading,
            isSuccess: state.isSuccess,
            dispatch,
        }}>
        {
            children
        }
    </AuthContext.Provider>
}