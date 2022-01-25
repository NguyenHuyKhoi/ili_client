import { PLATFORM_ACCOUNT_TYPES_ID } from "../context"
import FacebookHelper from "./facebook"
import YoutubeHelper from "./youtube"

export const getPlatformHelper = (account) => {
    switch (account.id) {
        case PLATFORM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST:
            return YoutubeHelper
        case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE:
        case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_GROUP:
        case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PAGE:
            return FacebookHelper
        default:
            return FacebookHelper
            
    }
}