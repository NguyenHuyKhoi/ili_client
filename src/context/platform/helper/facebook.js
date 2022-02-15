import axios from "axios";
import { PLATFORM_ACCOUNT_TYPES_ID } from "../../platform/context";
/* global FB */
class FacebookHelper {

    static transitionToLive = async (_id, account) => {
        try {
            console.log('Go live profile :', _id, account)
            const {accessToken} = account
    
            const url = `https://graph.facebook.com/${_id}?status=LIVE_NOW&access_token=${accessToken}`
            console.log("URL live fb:", url)
          
            console.log("Transitio to live live fb success: ")
            return true
        }
        catch (err) {
            console.log("Error live fb:", err)
            return null
        }
    }


    static goLive = async (livestream, account, social = null) => {
        try {
            const {title,description} = livestream
            const userID = account.userID
            const userAccessToken = account.accessToken
            const socialID = social != null ? social.id : ''
            const socialAccessToken = social != null ? social.accessToken : ''

            var edgeID = ''
            var type = ''
            var token = ''
            switch (account.id) {
                case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE: 
                    edgeID = userID
                    token = userAccessToken
                    type = 'profile'
                    break
                case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_GROUP: 
                    edgeID = socialID
                    token = userAccessToken
                    type = 'group'
                    break
                case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PAGE: 
                    edgeID = socialID
                    token = socialAccessToken
                    type = 'page'
                    break
                default: 
                    break
            }

            var url = `https://graph.facebook.com/${edgeID}/live_videos?status=LIVE_NOW&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&access_token=${token}`
            let res = await axios.post(url)
          
            console.log("Create live fb success: ", res.data)
            let {id, stream_url } = res.data
            
            livestream.livestreamId = id 
            livestream.streamUrl = stream_url
            livestream.accessToken = token
            livestream.platform = 'facebook'
            livestream.type = type
            console.log("Create stream fb", livestream)
            return livestream
        }
        catch (err) {
            console.log("Go live fail:", err);
            return null
        }
       
    }
    static endLive = async (livestream, account) => {
        try {
           const {livestreamId} = livestream
           const {accessToken} = account
           const url = `https://graph.facebook.com/${livestreamId}?end_live_video=true&access_token=${accessToken}`
   
           await axios.post(url)

           return true
       }
       catch (err) {
           console.log("Error live fb:", err)
           return null
       }
       
   }

    static getLivestream = async (_id, account) => {
        try {
            const { accessToken} = account
            console.log('Get livestream fb: ', _id, account)
            const url = `https://graph.facebook.com/${_id}?fields=ingest_streams,permalink_url,status&access_token=${accessToken}`
            let res = await axios.get(url)
            let {data} = res
            console.log("Get livestream fb success", data)
            return data
        }
        catch (err) {
            console.log("Error live fb:", err)
            return null
        }
        
    }

    static listenStatus = (_id, account, listened_status = 'LIVE') => {
        return new Promise((resolve, reject) => {
            var count = 0
            var _interval = setInterval(async() => {
                count ++
                if (count > 30) {
                    clearInterval(_interval)
                }
                let res = await FacebookHelper.getLivestream(_id, account)
                if (res != null) {
                    let {status, permalink_url} = res
                    console.log("Listen status stream", status, res)
                    if (status ===listened_status) {
                        clearInterval(_interval)
                        resolve(permalink_url)
                    }
                    else {
                        console.log("Livestream is not live")
                    }
                }
            }, 1000)
        })
    }

    // static updateLivestream = async (livestream) => {
    //     try {
    //         const {title,description, account, livestreamId} = livestream
    //         const {userID, accessToken} = account
    
    //         const url = `https://graph.facebook.com/${livestreamId}?access_token=${accessToken}`
    //         let res = await axios.post(`https://graph.facebook.com/${livestreamId}?embeddable=true`)
    //         let {data} = res
    //         console.log("Update livestream fb success", data)
    //         return data
    //     }
    //     catch (err) {
    //         console.log("Error live fb:", err)
    //         return null
    //     }
        
    // }
    static getPermissions = (accountType) => {
        switch (accountType) {
            case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE:
                return 'publish_video'
            case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PAGE:
                return 'publish_video,pages_manage_posts,pages_read_engagement,pages_read_user_content,pages_manage_engagement'
            case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_GROUP:
                return 'publish_video,publish_to_groups,groups_access_member_info'
            default:
                return ''
        }
    }

    static getPages = async (account) => {
        try {
            console.log('Get fb pages :', account)
            const {userID, accessToken} = account
    
            const url = `https://graph.facebook.com/${userID}/accounts?access_token=${accessToken}&fields=picture,access_token,name,id`
            console.log("Get fb pages urls", url)
            let res = await axios.get(url)
            const {data} = res.data
            var list = data.map((item) => {
                return {
                    id: item.id,
                    accessToken: item.access_token,
                    name: item.name,
                    avatar: item.picture ? item.picture.data.url : null,
                    type: 'page'
                }
            })
            console.log("Get fb pages List:", list);
            return list
        }
        catch (err) {
            console.log("Error get Fb pages:", err);
            return null
        }
    }

    static getGroups = async (account) => {
        try {
            console.log('Get fb groups :', account)
            const {userID, accessToken} = account
    
            const url = `https://graph.facebook.com/${userID}/groups?access_token=${accessToken}&fields=picture,access_token,name,id&admin_only=true`
            console.log("Get fb groups urls", url)
            let res = await axios.get(url)
            const {data} = res.data
            var list = data.map((item) => {
                return {
                    id: item.id,
                    accessToken: item.access_token,
                    name: item.name,
                    avatar: item.picture ? item.picture.data.url : null,
                    type: 'group'
                }
            })
            return list
        }
        catch (err) {
            console.log("Error get Fb groups:", err);
            return null
        }
    }
    
    static auth =  (accountType) => {
        return new Promise((resolve, reject) => {
            let permissions = this.getPermissions(accountType)
            if (permissions ==='') {
                reject({
                    error: 'AccountType is invalid'
                })
                return
            }

            FB.login(res => {
                if (res.status ==='connected') {
                    let {accessToken, userID, expiresIn} =  res.authResponse
                    console.log('Auth fb success :', res.authResponse)
                    resolve({
                        userID,
                        accessToken,
                        expiresIn
                    })
                    // axios.get(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${accessToken}`)
                    //     .then((response) => {
                    //         console.log("Get long live token:", response)
                    //         const {access_token, expires_in} =response.data
                    //         resolve({
                    //             userID,
                    //             accessToken: access_token,
                    //             expiresIn: expires_in
                    //         })
                    // })
                }
                else {
                    reject({
                        error: 'User not connected'
                    })
                }
            },{scope: permissions});
        })
    }

    static logout = () => {
        return new Promise((resolve, reject) => {
            FB.logout(function(response) {
                console.log("Logout success")
                resolve()
            });
        })
    }


}

export default FacebookHelper