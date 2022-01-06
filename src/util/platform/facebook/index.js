
class FacebookHelper {
    active = () => {
        return new Promise(resolve, reject => {
            FB.login(res => {
                if (res.status == 'connected') {
                    let {accessToken, userID} =  res.authResponse
                    console.log("Auth FB successfully:", accessToken, userID)
                    resolve({
                        userID,
                        accessToken
                    })
                }
                else {
                    reject()
                }
            },{scope: 'publish_video'})
        })
    }
}