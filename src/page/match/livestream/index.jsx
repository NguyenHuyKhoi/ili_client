import { Alert, Grid, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth/context'
import { updateLivestreamStage, updateMatch } from '../../../context/match/play/actions'
import { LIVESTREAM_STAGE, MatchPlayContext } from '../../../context/match/play/context'
import FacebookHelper from '../../../util/platform/facebook'
import YoutubeHelper from '../../../util/platform/youtube'
import MatchStatus from './component/MatchStatus'
import QuestionDetailModal from './component/QuestionDetailModal'
import SettingModal, { STREAM_ACCOUNT_TYPES_ID } from './component/SettingModal'
import TemplateSlider from './component/TemplateSlider'
import Topbar from './component/Topbar'

/* global gapi */
/* global FB */

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
        height: '100vh',
        overflowY: 'hidden'
    },
    body: {
        flex: 1,
        marginTop: theme.spacing(8)
    }
}))

const MatchLivestreamPage = () => {
    const classes = useStyles()
    const {dispatch, match, livestream, livestreamStage} = useContext(MatchPlayContext)
    const navigate = useNavigate()
    const {user, token} = useContext(AuthContext)
    const [modal, setModal] = useState({})
    const [alert, setAlert] = useState({})

    const [fbUrl, setFbUrl] = useState('')
    const handleClickBtn = () => {
        //console.log("Handle click btn")
        switch (livestreamStage) {
            case LIVESTREAM_STAGE.NON_CREATED:
                handleLive()
                break;
            case LIVESTREAM_STAGE.CREATING:
                setAlert({
                    type: 'info',
                    msg: 'Livestream is creating, waiting ...'
                })
                break;
            case LIVESTREAM_STAGE.READY:
                setAlert({
                    type: 'info',
                    msg: 'Livestream is ready, waiting ...'
                })
                break;
            case LIVESTREAM_STAGE.LIVE:
                handleEndLive()
                break;
            case LIVESTREAM_STAGE.COMPLETE:
                navigate('', {replace: false})
                break;
        }
    }
    const handleEndLiveFbProfile = async () => {
        //console.log("End live YT")
        await FacebookHelper.endLive(livestream)
        axios.post('match/livestream/complete', {pinCode:match.pinCode} ,{
            headers: {
                'x-access-token': token
            }
            })
            .then ((res) => {
                dispatch(updateLivestreamStage(LIVESTREAM_STAGE.COMPLETE))
                setAlert({
                    type: 'success',
                    msg: 'End livestream successfully...'
                })
            })
            .catch((err) => {
                let error = err.response ? err.response.data : 'Server is failure complete'
                //console.log("Error :", error)
                dispatch(updateLivestreamStage(LIVESTREAM_STAGE.NON_CREATED))
                setAlert({
                    type: 'error',
                    msg: 'End livestream failure, try again....'
                })
        })
    }

    const handleEndLive = () => {
        switch (livestream.account.accountType) {
            case STREAM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST:
                handleEndLiveYT()
                break
            case STREAM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE:
                handleEndLiveFbProfile()
                break
            default:
                //console.log("Not supported now.")
                setAlert({
                    type: 'error',
                    msg: 'Not supported now'
                })
                break
                
        }
    }

    const handleEndLiveYT = async () => {
        //console.log("End live YT")
        await YoutubeHelper.endLive(livestream)
        axios.post('match/livestream/complete', {pinCode:match.pinCode} ,{
            headers: {
                'x-access-token': token
            }
            })
            .then ((res) => {
                dispatch(updateLivestreamStage(LIVESTREAM_STAGE.COMPLETE))
                setAlert({
                    type: 'success',
                    msg: 'End livestream successfully...'
                })
            })
            .catch((err) => {
                let error = err.response ? err.response.data : 'Server is failure complete'
                //console.log("Error :", error)
                dispatch(updateLivestreamStage(LIVESTREAM_STAGE.NON_CREATED))
                setAlert({
                    type: 'error',
                    msg: 'End livestream failure, try again....'
                })
        })
    }

    const handleLive =  () => {
        if (livestream.account == undefined) {
            setAlert({
                type: 'error',
                msg: 'Please choose an account to live'
            })
            return
        }
        dispatch(updateLivestreamStage(LIVESTREAM_STAGE.CREATING))

        switch (livestream.account.accountType) {
            case STREAM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST:
                handleLiveYT()
                break
            case STREAM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE:
                handleLiveFbProfile()
                break
            default:
                //console.log("Not supported now.")
                setAlert({
                    type: 'error',
                    msg: 'Not supported now'
                })
                
        }
    }

    const handleLiveYT = async () => {
        var res = await YoutubeHelper.goLive(livestream)
        if (res == null) {
            //console.log("Go live failured")
            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.NON_CREATED))
            return
        }
            //console.log("Broadcast created, ready to stream:", res)
        try {
            res = await axios.post('match/livestream/create', {...match, livestream: res}, {
                headers: {
                    'x-access-token': token
                }
            })
            //console.log("Create match with livestream", data)
            dispatch(updateMatch(res.data))
            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.READY))
            
            listenBroadcastStatus(res.data)
            setAlert({
                type: 'success',
                msg: 'Create livestream succcessfully, waiting livestream on live...'
            })
        }
        catch(err) {
            let error = err.response ? err.response.data : 'Server is failure create'
            console.log("Error:", err)
            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.NON_CREATED))
            setAlert({
                type: 'error',
                msg: 'Create livestream failure, try again....'
            })
           
        }
      
    }

    const handleLiveFbProfile = async () => {
        var res = await FacebookHelper.goLiveProfile(livestream)
        console.log("Create res livestream fb:", res)
        if (res == null) {
            console.log("Go live failured")
            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.NON_CREATED))
            return
        }
        try {
            res = await axios.post('match/livestream/create', {...match, livestream: res}, {
                headers: {
                    'x-access-token': token
                }
            })
            dispatch(updateMatch(res.data))
            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.READY))
            
            console.log("Created Match On FB:", res.data)
            listenBroadcastStatus(res.data)
            setAlert({
                type: 'success',
                msg: 'Create livestream succcessfully, waiting livestream on live...'
            })
        }
        catch(err) {
            let error = err.response ? err.response.data : 'Server is failure create'
            console.log("Error:", err)
            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.NON_CREATED))
            setAlert({
                type: 'error',
                msg: 'Create livestream failure, try again....'
            })
           
        }
    }
    const listenFBStatus = (createdMatch, listened_status = 'LIVE') => {
        let count = 0
        let isStartedMatch = false
        let _interval = setInterval(async() => {
            count ++
            if (count > 60) {
                clearInterval(_interval)
            }
            try {
                let res = await FacebookHelper.getLivestream(livestream)
                if (res != null) {
                    let {status, permalink_url} = res
                    console.log("Livestream is live ", status)
                    if (status == listened_status) {
                        //clearInterval(_interval)
                        if (!isStartedMatch) {
                            isStartedMatch = true
                            startMatchOnServer(createdMatch)
                            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.LIVE))
                            setFbUrl(permalink_url)
                        }
                        else {
                            console.log("Dont set livestream stage")
                        }
                     
                    }
                    else {
                        console.log("Livestream is not live", status)
                    }
                }
            }
            catch (err) {
                console.log("Get livestream fb error")
            }
           
        }, 2000)
    
    }

    const listenYTStatus = (createdMatch, listened_status = 'live') => {
        let count = 0
        let _interval = setInterval(async() => {
            count ++
            if (count > 30) {
                clearInterval(_interval)
            }
            let {broadcastId} = createdMatch.livestream
            let res = await YoutubeHelper.getBroadcast(broadcastId)
            if (res != null) {
                let status = res.status.lifeCycleStatus
                if (status == listened_status) {
                    console.log("Livestream is live ")
                    clearInterval(_interval)
                    startMatchOnServer(createdMatch)
                    dispatch(updateLivestreamStage(LIVESTREAM_STAGE.LIVE))
                }
                else {
                    console.log("Livestream is not live")
                }
            }
        }, 1000)
    
    }

    const listenBroadcastStatus =  (createdMatch) => {
        let {account} = livestream 
        if (account == undefined) return
        switch (account.accountType) {
            case (STREAM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST) : {
                console.log("Listen Youtube status")
                listenYTStatus(createdMatch)
                break
            }   
            case (STREAM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE) : {
                console.log("Listen Youtube status")
                listenFBStatus(createdMatch)
                break
            }   
            default: 
                break
        }
    }


    const startMatchOnServer = (createdMatch) => {
        axios.post('match/livestream/start', {pinCode: createdMatch.pinCode}, {
            headers: {
                'x-access-token': token
            }
            })
            .then ((res) => {
            })
            .catch((err) => {
                console.log("Error :", err)

        })
    }

    var showLivestream =  (livestreamStage == LIVESTREAM_STAGE.LIVE || livestreamStage == LIVESTREAM_STAGE.COMPLETE)

    const getVideoUrl = () => {
        let {account} = livestream
        if (account == undefined) {
            return null 
        }
        // console.log("Video FB Url: ",  `https://www.facebook.com/plugins/video.php?width=1280&href=https%3A%2F%2Fwww.facebook.com${encodeURIComponent(fbUrl)}`)
        switch (account.accountType) {
            case STREAM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST: 
                return `https://www.youtube.com/embed/${livestream.broadcastId}?autoplay=1&mute=1`
            case STREAM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE:
                return `https://www.facebook.com/plugins/video.php?width=1280&href=https%3A%2F%2Fwww.facebook.com${encodeURIComponent(fbUrl)}`
            default: 
                return null
        }
    }
    return (
        <div className = {classes.container}>
            <Snackbar open={alert.type != undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>
            <SettingModal 
                setting = {livestream}
                open = {modal.state == 'setting'}     
                onClose = {() => setModal({})}
                onCancel = {() => setModal({})}
                onAlert = {(msg) => setAlert({
                    type: 'error',
                    msg
                })}
                onDone = {(setting) => {
                    setModal({})
                    dispatch(updateMatch({
                        ...match,
                        livestream: setting
                    }))
                }}/>

            <QuestionDetailModal 
                open = {modal.state == 'view_question'}     
                onClose = {() => setModal({})}
            />
            <Topbar
                onSetting = {() => setModal({state: 'setting'})}
                onClickBtn = {handleClickBtn}
            />
            <div className = {classes.body}>
                <Grid container columnSpacing={3} sx = {{height: '100%'}}>
                    <Grid item xs = {9} >
                        {
                            showLivestream ? 
                            <div style= {{
                                flex: 1,
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems:"center"
                            }}>

                                {/* <iframe 
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                                    allowfullscreen="true" 
                                    frameborder="0"
                                    height="720" 
                                    scrolling="no" 
                                    src="https://www.facebook.com/plugins/video.php?width=1280&href=https%3A%2F%2Fwww.facebook.com%2F212638061068218%2Fvideos%2F608468110450899" 
                                    style="border:none;overflow:hidden" 
                                    width="1280">
                                </iframe> */}

                                <iframe src={getVideoUrl()}
                                    style = {{
                                        height: '90%',
                                        margin: 'auto',
                                        width: '80%'
                                    }}
                                    frameBorder='0'
                                    allow='autoplay'
                                    allowFullScreen
                                    title={livestream.title}
                                />
                             </div>
                           
                            :
                            <TemplateSlider/>
                        }
                    </Grid>
                    <Grid item xs = {3}>
                        <MatchStatus    
                            onSelectQuestion = {() => setModal({state: 'view_question'})}/>
                    </Grid>
                </Grid>
            </div>  
        </div>
    )
}

export default MatchLivestreamPage
