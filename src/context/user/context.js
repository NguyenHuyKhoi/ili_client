import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

const INITIAL_STATE = {
    isLoading: false,
    message: "",
    isSuccess: false,
    user: {}
}

export const UserContext = createContext(reducer)

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    return <UserContext.Provider
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
    </UserContext.Provider>
}