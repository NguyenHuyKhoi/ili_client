import axios from "axios";
import { PLATFORM_ACCOUNT_TYPES_ID } from "../../platform/context";
const APP_ID = '269861025134273'
const APP_SECRET = '6bbec2116f51aa47042ec52bf5438301'
/* global FB */
class FacebookHelper {

    static goLiveProfile = async (livestream, account) => {
        try {
            console.log('Go live profile :', livestream, account)
            const {title,description} = livestream
            const {userID, accessToken} = account
    
            // Set timeout 30s for transition to live
            // const currentTime = Math.floor((new Date()).getTime() / 1000)
            // const scheduleTime =  currentTime + 300
            // console.log("Schedule time:", currentTime, scheduleTime)
            const url = `https://graph.facebook.com/${userID}/live_videos?status=LIVE_NOW&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&access_token=${accessToken}`
            console.log("URL live fb:", url)
            let res = await axios.post(url)
          
            console.log("Create live fb success: ", res.data)
            let {id, stream_url } = res.data
            
            livestream.livestreamId = id 
            livestream.streamUrl = stream_url
            
            console.log("Stream URL: ", stream_url)
            return livestream
        }
        catch (err) {
            console.log("Error live fb:", err)
            return null
        }
    }

    static transitionToLive = async (_id, account) => {
        try {
            console.log('Go live profile :', _id, account)
            const {userID, accessToken} = account
    
            const url = `https://graph.facebook.com/${_id}?status=LIVE_NOW&access_token=${accessToken}`
            console.log("URL live fb:", url)
            let res = await axios.post(url)
          
            console.log("Transitio to live live fb success: ")
            return true
        }
        catch (err) {
            console.log("Error live fb:", err)
            return null
        }
    }


    static goLive = async (livestream, account) => {
        console.log('Go live fb: ', livestream, account)
        var res = null 
        switch (account.id) {
            case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE: 
                res = await FacebookHelper.goLiveProfile(livestream, account)
                break
            default: 
                break
        }
        return res
    }
    static endLive = async (livestream, account) => {
        try {
           const {title,description, livestreamId} = livestream
           const {userID, accessToken} = account
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
                    if (status == listened_status) {
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

    
    static auth =  () => {
        return new Promise((resolve, reject) => {
            FB.login(res => {
                if (res.status == 'connected') {
                    let {accessToken, userID, expiresIn} =  res.authResponse
                    console.log('Token fb expires in :', expiresIn)
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
            },{scope: 'publish_video'});
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