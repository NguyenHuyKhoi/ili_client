import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

const INITIAL_STATE = () => {
    let state = {
        collection: null,
        collections: []
    }
    const saved = localStorage.getItem('collection_context')
    if (saved) {
        return{
            ...state,
            ...JSON.parse(saved)
        }
    }
    else {
        return {
            ...state
        }
    }
}


export const CollectionContext = createContext(reducer)

export const CollectionContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE())
    useEffect(() => {
        localStorage.setItem('collection_context', JSON.stringify(state))
        return () => {
            
        }
    }, [state])
    return <CollectionContext.Provider
        value = {{
            collections: state.collections,
            collection: state.collection,
            dispatch
        }}>
        {
            children
        }
    </CollectionContext.Provider>
}