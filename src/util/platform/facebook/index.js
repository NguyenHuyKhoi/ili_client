import axios from "axios";

/* global FB */
class FacebookHelper {
    
    static auth =  () => {
        return new Promise((resolve, reject) => {
            FB.login(res => {
                if (res.status == 'connected') {
                    let {accessToken, userID} =  res.authResponse
                    resolve({
                        userID,
                        accessToken
                    })
                    console.log("Auth FB successfully:", accessToken, userID)
                }
                else {
                    reject({
                        error: 'User not connected'
                    })
                }
            },{scope: 'publish_video'});
        })
    }

    static goLiveProfile = async (livestream) => {
        try {
            const {title,description, account} = livestream
            const {userID, accessToken} = account
            const url = `https://graph.facebook.com/${userID}/live_videos?status=LIVE_NOW&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&access_token=${accessToken}`
            console.log("Create live fb url :", url)
    
            let res = await axios.post(url)
            let {id, secure_stream_url } = res.data
            
            livestream.livestreamId = id 
            livestream.streamUrl = secure_stream_url
            
            console.log("Stream URL: ", secure_stream_url)
            return livestream
        }
        catch (err) {
            console.log("Error live fb:", err)
            return null
        }
      
    }

    static getLivestream = async (livestream) => {
        try {
            const {title,description, account, livestreamId} = livestream
            const {userID, accessToken} = account
            const url = `https://graph.facebook.com/${livestreamId}?fields=embed_html,ingest_streams,permalink_url,status&access_token=${accessToken}`
    
            let res = await axios.get(url)
            let {data} = res
            console.log("Get livestream fb success", data.ingest_streams)

            return data
        }
        catch (err) {
            console.log("Error live fb:", err)
            return null
        }
        
    }


    static endLive = async (livestream) => {
         try {
            const {title,description, account, livestreamId} = livestream
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
}

export default FacebookHelper