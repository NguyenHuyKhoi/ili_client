import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

export const sample_collection = {title: '',cover: null, description: '', visibility: 'public', games:[]}
const INITIAL_STATE = () => {
    let state = {
        collection: null,
        collections: [],
        mode: 'edit'
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
            mode: state.mode,
            dispatch
        }}>
        {
            children
        }
    </CollectionContext.Provider>
}