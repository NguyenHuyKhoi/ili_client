import { createContext, useEffect, useReducer } from "react"
import sampleReducer from "./sampleReducer"

const INITIAL_STATE = {
    sample: null,
}

export const SampleContext = createContext(sampleReducer)

export const SampleContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(sampleReducer, INITIAL_STATE)

    return <SampleContext.Provider
        value = {{
            sample: state.sample,
        }}>
        {
            children
        }
    </SampleContext.Provider>
}