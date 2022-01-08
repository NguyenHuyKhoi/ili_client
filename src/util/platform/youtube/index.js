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
                        enableAutoStart: false,
                        enableAutoStop: true,
                        monitorStream: {
                            enableMonitorStream: false,
                        },
                        latencyPreference: 'ultraLow',
                        enableEmbed: true
                    },
                    status: {
                        privacyStatus: livestream.privacy ? livestream.privacy : 'unlisted', //private//public
                        selfDeclaredMadeForKids: false,
                    },
                },
                })
            const data = res.result
            console.log("Create broadcast ", data.id)
            livestream.broadcastId = data.id
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
                    id: livestream.broadcastId,
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

    static goLive = async (data) => {
        data.platform = 'youtube'
        let livestream = await this.createBroadcast(data)
        console.log("Livestream after creatbroadcast: ", livestream)
        if (livestream == null) return null 

        livestream = await this.createStream(livestream)
        console.log("Livestream after createStream: ", livestream)
        if (livestream == null) return null 

        livestream = await this.bindBroadcastToStream(livestream)
        livestream.access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token
        console.log("Livestream after bind:", livestream)
        return livestream
    }

    

    static endLive = async (livestream) => {
        try {
            await gapi.client.youtube.liveBroadcasts
                .transition({
                    broadcastStatus: "complete",
                    id: livestream.broadcastId,
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

    static transitionToLive = async (livestream) => {
        try {
            await gapi.client.youtube.liveBroadcasts
                .transition({
                    broadcastStatus: "live",
                    id: livestream.broadcastId,
                    part: [
                        "snippet,contentDetails,status"
                    ]
                })
        }
        catch (err) {
            console.log("Auth YT transitionToLive: ", err)
            return null
        }
    }
    static getBroadcast = async (id) => {
        try {
            let res = await gapi.client.youtube.liveBroadcasts
                .list({
                    "part": [ "snippet,contentDetails,status" ],
                    "id": [   id ]
                })
            let items = res.result.items
            console.log("Get broadcast: ", res.result, res.result.items)
            if (items.length == 0) return null 
            return items[0]
        }
        catch (err) {
            console.log("getbroadcast error: ", err)
            return null
        }
    }

    static getLivestream = async (id) => {
        try {
            let res = await gapi.client.youtube.liveStreams
                .list({
                    "part": [ "id,cdn,snippet,status" ],
                    "id": [ id ]
                })
            let items = res.result.items
            console.log("Get stream: ", res.result, res.result.items)
            if (items.length == 0) return null 
            return items[0]
        }
        catch (err) {
            console.log("getStream : ", err)
            return null
        }
    }

    static auth = () => {
        return new Promise((resolve, reject) => {
            gapi.auth2.getAuthInstance()
            .signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
            .then ((res) => {
                gapi.client.setApiKey(API_KEY)
                gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
                    .then((res) => {
                        resolve()
                    })
                    
            }
            )
            .catch(reject)
        })
    }
}

export default YoutubeHelper