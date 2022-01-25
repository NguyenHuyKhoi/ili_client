import { createContext, useReducer } from "react"
import reducer from "./reducer"

const INITIAL_STATE = {
    user: {}
}

export const UserContext = createContext(reducer)

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    return <UserContext.Provider
        value = {{
            user: state.user,
            dispatch,
        }}>
        {
            children
        }
    </UserContext.Provider>
}