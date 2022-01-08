import { Alert, Grid, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth/context'
import { updateLivestreamStage, updateMatch } from '../../../context/match/play/actions'
import { LIVESTREAM_STAGE, MatchPlayContext } from '../../../context/match/play/context'
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

    const handleClickBtn = () => {
        console.log("Handle click btn")
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

    const handleEndLive = () => {
        switch (livestream.account.accountType) {
            case STREAM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST:
                handleEndLiveYT()
                break
            default:
                console.log("Not supported now.")
                setAlert({
                    type: 'error',
                    msg: 'Not supported now'
                })
                break
                
        }
    }

    const handleEndLiveYT = async () => {
        console.log("End live YT")
        await YoutubeHelper.endLive(livestream)
        axios.post('match/livestream/complete', {pinCode: match.pinCode} ,{
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
                console.log("Error :", error)
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
            default:
                console.log("Not supported now.")
                setAlert({
                    type: 'error',
                    msg: 'Not supported now'
                })
                
        }
    }

    const handleLiveYT = async () => {
        let res = await YoutubeHelper.goLive(livestream)
        if (res == null) {
            console.log("Go live failured")
            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.NON_CREATED))
            return
        }
        else {
            console.log("Broadcast created, ready to stream:", res)
            dispatch(updateMatch({
                livestream: res
            }))
            match.livestream = res

            console.log("Post to server to create match:", match)
            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.READY))
            axios.post('match/livestream/create', match, {
                    headers: {
                        'x-access-token': token
                    }
                })
                .then ((res) => {
                    let match = res.data
                    setAlert({
                        type: 'success',
                        msg: 'Create livestream succcessfully, waiting livestream on live...'
                    })
                    console.log("Create match with livestream", match)
                    dispatch(updateMatch(match))
                    listenStreamStatus('active')
                    listenBroadcastStatus('live')
                })
                .catch((err) => {
                    let error = err.response ? err.response.data : 'Server is failure create'
                    console.log("Error :", error)
                    dispatch(updateLivestreamStage(LIVESTREAM_STAGE.NON_CREATED))
                    setAlert({
                        type: 'error',
                        msg: 'Create livestream failure, try again....'
                    })
            })
           
            // set state for prepare 

            // set state for go live when broadcast is live
        }
    }


    const listenBroadcastStatus = (listened_status) => {
        let {broadcastId} = livestream
        let count = 0
        var broadcastStatusTimer = setInterval(async () => {
            count ++ 
            if (count >= 60) clearInterval(broadcastStatusTimer)
            let res = await YoutubeHelper.getBroadcast(broadcastId)
            if (res != null) {
                let status = res.status.lifeCycleStatus
                if (status == listened_status) {
                    clearInterval(broadcastStatusTimer)
                    console.log("Livestream is live ")
                   
                    startMatchOnServer()
                    dispatch(updateMatch({
                        livestream
                    }))
                    dispatch(updateLivestreamStage(LIVESTREAM_STAGE.LIVE))
                   
                }
            }
        }, 1000)
    }

    const startMatchOnServer = () => {
        axios.post('match/livestream/start', {pinCode: match.pinCode}, {
            headers: {
                'x-access-token': token
            }
            })
            .then ((res) => {
                console.log("Start match now...")
            })
            .catch((err) => {
                console.log("Error :", err)

        })
    }

    const listenStreamStatus = (listened_status = 'active') => {
        let {streamId} = livestream
        let count = 0
        var streamStatusTimer = setInterval(async () => {
            count ++ 
            if (count >= 100) clearInterval(streamStatusTimer)
            let res = await YoutubeHelper.getLivestream(streamId)
            if (res != null) {
                let status = res.status.streamStatus
                if (status == listened_status) { // default is active
                    clearInterval(streamStatusTimer)
                    console.log("Stream is active")
                    //Transition to live
                    await YoutubeHelper.transitionToLive(livestream)
                }
            }
        }, 500)
    }

    const images = [
        { url: "https://image.freepik.com/free-photo/chinese-new-year-still-life-tiger-celebration_23-2149210715.jpg" },
        { url: "https://image.freepik.com/free-photo/neon-frame-surrounded-by-balloons-color-year-2022_23-2149217418.jpg" },
        { url: "https://image.freepik.com/free-vector/2022-tiger-year-greeting-card_317396-1413.jpg" }
    ];

    var showLivestream =  (livestreamStage == LIVESTREAM_STAGE.LIVE || livestreamStage == LIVESTREAM_STAGE.COMPLETE)

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
                                <iframe src={`https://www.youtube.com/embed/${livestream.broadcastId}?autoplay=1&mute=1`}
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
