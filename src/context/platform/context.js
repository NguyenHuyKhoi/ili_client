import { createContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

import youtube_icon from '../../asset/image/youtube_icon.png'
import facebook_icon from '../../asset/image/facebook_icon.png'
export const PLATFORM_ACCOUNT_TYPES_ID = {
	YOUTUBE_BROAD_CAST: 0,
	FB_LIVESTREAM_PROFILE: 1,
	FB_LIVESTREAM_GROUP: 2,
	FB_LIVESTREAM_PAGE: 3
}

export const PLATFORM_ACCOUNT_TYPES = [
	{
		logo: youtube_icon,
		title: 'Youtube',
		id: PLATFORM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST,
        active: false
	},
	{
		logo: facebook_icon,
		title: 'Fb profile',
		id: PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE,
        active: false,
	},
    {
		logo: facebook_icon,
		title: 'Fb group',
		id: PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_GROUP,
        active: false,
	},
    {
		logo: facebook_icon,
		title: 'Fb page',
		id: PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PAGE,
        active: false,
	}
]

const INITIAL_STATE = {
    platforms: JSON.parse(localStorage.getItem('platform_context') || JSON.stringify(PLATFORM_ACCOUNT_TYPES)),
    platform: null,
    social: null,
    fbPages: [],
    fbGroups: [],
    ytChannels: []
}

export const PlatformContext = createContext(reducer)

export const PlatformContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem('platform_context', JSON.stringify(state.platforms))
        return () => {
            
        }
    }, [state.platforms])
    return <PlatformContext.Provider
        value = {{
            platforms: state.platforms,
            platform: state.platform,
            social: state.social,
            dispatch,
        }}>
        {
            children
        }
    </PlatformContext.Provider>
}