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
                        monitorStream: {
                            enableMonitorStream: false,
                        },
                    },
                    status: {
                        privacyStatus: livestream.privacy ? livestream.privacy : 'private',
                        selfDeclaredMadeForKids: false,
                    },
                },
                })
            console.log("Create broadcast ", res.result.id)
            livestream.broadcastId = res.result.id
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
        console.log("Livestream after bind:", livestream)
        return livestream
    }

    static endLive = async (data) => {
        
    }
    static auth = () => {
        return new Promise((resolve, reject) => {
            gapi.auth2.getAuthInstance()
            .signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
            .then ((res) => {
                gapi.client.setApiKey(API_KEY)
                gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
                    .then((res) => resolve())
                    
            }
            )
            .catch(reject)
        })
    }
}

export default YoutubeHelper