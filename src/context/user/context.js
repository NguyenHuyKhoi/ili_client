import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

const INITIAL_STATE = {
    isLoading: false,
    message: "",
    isSuccess: false
}

export const UserContext = createContext(reducer)

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    return <UserContext.Provider
        value = {{
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