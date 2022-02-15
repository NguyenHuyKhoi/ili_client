
/* global gapi */
const API_KEY = 'AIzaSyCpmqo8ByzMuPbZ8g97mSCRcs4Wi-bJTe0'
class YoutubeHelper {
    static createBroadcast =async (livestream) => {
        try {
            let res = await gapi.client.youtube.liveBroadcasts
                .insert({
                part: ['id,snippet,contentDetails,status'],
                resource: {
                    snippet: {
                        title: livestream.title ? livestream.title : `Broadcast on ${(new Date()).getDate()}`,
                        scheduledStartTime: livestream.date ? livestream.date : `${new Date().toISOString()}`,
                        description: livestream.description ? livestream.description : 'A broadcast is creating by ILI',
                    },
                    contentDetails: {
                        recordFromStart: true,
                        // startWithSlate: true,
                        enableAutoStart: true,
                        enableAutoStop: true,
                        monitorStream: {
                            enableMonitorStream: false,
                        },
                        latencyPreference: 'ultraLow',
                        enableEmbed: true
                    },
                    status: {
                        privacyStatus: livestream.privacy ? livestream.privacy : 'public', //private//public
                        selfDeclaredMadeForKids: false,
                    },
                },
                })
            const data = res.result
            console.log("Create broadcast ", data)
            livestream.livestreamId = data.id
            livestream.liveChatId = data.snippet.liveChatId
            return livestream
        }
        catch (err) {
            console.log("Auth YT createBroadcast: ", err)
            return null 
        }
    }

    static createStream =async (livestream) => {
        try {
            let res = await gapi.client.youtube.liveStreams
                .insert({
                    part: ['snippet,cdn,contentDetails,status'],
                    resource: {
                        snippet: {
                            title: livestream.title ? livestream.title : `Stream on ${(new Date()).getDate()}`,
                            description: livestream.description ? livestream.description : 'A stream is streamming by ILI',
                        },
                        cdn: {
                            frameRate: 'variable',
                            ingestionType: 'rtmp',
                            resolution: 'variable',
                            format: '',
                        },
                        contentDetails: {
                            isReusable: true
                        },
                    },
                })
            console.log("create stream res;", res)
            let {ingestionAddress, streamName} = res.result.cdn.ingestionInfo
            livestream.streamId = res.result.id
            livestream.streamUrl = ingestionAddress + '/' + streamName
            console.log("Create stream ", res.result.id, ingestionAddress + '/' + streamName)

            return livestream
        }
        catch (err) {
            console.log("Auth YT createStream: ", err)
            return null
        }
    }

    static bindBroadcastToStream = async (livestream) => {
        try {
            await gapi.client.youtube.liveBroadcasts
                .bind({
                    part: ['id,snippet,contentDetails,status'],
                    id: livestream.livestreamId,
                    streamId: livestream.streamId,
                })
            livestream.bindStreamToBroadcast = true 
            return livestream
        }
        catch (err) {
            console.log("Auth YT bindBroadcastToStream: ", err)
            return null
        }
    }

    static goLive = async (data, account) => {
        data.platform = 'youtube'
        let livestream = await this.createBroadcast(data)
        console.log("Livestream after creatbroadcast: ", livestream)
        if (livestream == null) return null 

        livestream = await this.createStream(livestream)
        console.log("Livestream after createStream: ", livestream)
        if (livestream == null) return null 

        livestream = await this.bindBroadcastToStream(livestream)
        //livestream.access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token
        livestream.platform = 'youtube'
        livestream.type = 'channel'
        console.log("Livestream after bind:", livestream)
        return livestream
    }

    static endLive = async (livestream, account) => {
        try {
            await gapi.client.youtube.liveBroadcasts
                .transition({
                    broadcastStatus: "complete",
                    id: livestream.livestreamId,
                    part: [
                        "snippet,contentDetails,status"
                    ]
                })
        }
        catch (err) {
            console.log("Auth YT endLive: ", err)
            return null
        }
    }
    
    static getLivestream = async (id) => {
        try {
            let res = await gapi.client.youtube.liveBroadcasts
                .list({
                    "part": [ "snippet,contentDetails,status" ],
                    "id": [ id ]
                })
            let items = res.result.items
            if (items.length === 0) return null 
            return items[0]
        }
        catch (err) {
            console.log("getbroadcast error: ", err)
            return null
        }
    }

    // static getInputStream = async (id) => {
    //     try {
    //         let res = await gapi.client.youtube.liveStreams
    //             .list({
    //                 "part": [ "id,cdn,snippet,status" ],
    //                 "id": [ id ]
    //             })
    //         let items = res.result.items
    //         if (items.length == 0) return null 
    //         return items[0]
    //     }
    //     catch (err) {
    //         console.log("getStream : ", err)
    //         return null
    //     }
    // }

    static auth = (accountType) => {
        return new Promise((resolve, reject) => {
            gapi.auth2.getAuthInstance()
            .signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
            .then ((res) => {
                gapi.client.setApiKey(API_KEY)
                gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
                    .then((res) => {
                        resolve({
                        })
                    })
                    
            }
            )
            .catch(reject)
        })
    }

    static listenStatus = (_id, account, listened_status = 'live') => {
        return new Promise((resolve, reject) => {
            var count = 0
            var _interval = setInterval(async() => {
                count ++
                if (count > 30) {
                    clearInterval(_interval)
                }
                let res = await YoutubeHelper.getLivestream(_id)
                console.log('Get livestream id', res)
                if (res != null) {
                    let status = res.status.lifeCycleStatus
                    if (status === listened_status) {
                        console.log("Livestream is live ")
                        clearInterval(_interval)
                        resolve(null)
                    }
                    else {
                        console.log("Livestream is not live")
                    }
                }
            }, 1000)
        })
    }
    static logout = () => {
        return new Promise((resolve, reject) => {
            gapi.auth2.getAuthInstance()
            .signOut({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
            .then ((res) => {
                resolve()       
            }
            )
            .catch(reject)
        })
    }
}

export default YoutubeHelper