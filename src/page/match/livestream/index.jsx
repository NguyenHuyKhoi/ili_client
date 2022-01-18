import { Alert, Grid, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlatformContext, PLATFORM_ACCOUNT_TYPES_ID } from '../../../context/platform/context'
import { updateLivestreamStage, updateMatch } from '../../../context/match/play/actions'
import { LIVESTREAM_STAGE, MatchPlayContext } from '../../../context/match/play/context'
import MatchStatus from './component/MatchStatus'
import QuestionDetailModal from './component/QuestionDetailModal'
import SettingModal from './component/SettingModal'
import TemplateSlider from './component/TemplateSlider'
import Topbar from './component/Topbar'
import { AuthContext } from '../../../context/auth/context'
import { getPlatformHelper } from '../../../context/platform/helper'
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
var platformHelper = null

const MatchLivestreamPage = () => {
    const classes = useStyles()
    const {dispatch, match, livestream, livestreamStage} = useContext(MatchPlayContext)
    const navigate = useNavigate()
    const {platform} = useContext(PlatformContext)
    const {user, token} = useContext(AuthContext)
    const [modal, setModal] = useState({})
    const [alert, setAlert] = useState({})

    const [fbUrl, setFbUrl] = useState('')

    useEffect(() => {
        if (platform != null) {
            platformHelper = getPlatformHelper(platform)
            console.log("Platform helper not null", (platformHelper != null && platformHelper != undefined))
        }
        return () => {
        }
    }, [platform])


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
                return navigate(-1)
        }
    }
    
    const handleEndLive = async () => {
        try {
            if (platform == null) {
                return
            }
            await platformHelper.endLive(livestream, platform)
            axios.post('match/livestream/complete', {pinCode:match.pinCode} ,{
                headers: {
                    'x-access-token': token
                }
                })
                .then ((res) => {
                    console.log('Update livestage to complete')
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
        catch (err) {
            console.log('End live:', err)
        }
        //console.log("End live YT")
       
    }

    const validateSetting = () => {
        if (platform == null) {
            setAlert({
                type: 'error',
                msg: 'Please choose an account to live'
            })
            return false
        }
        if (livestream.title == '' || livestream.title == null 
        || livestream.description == '' || livestream.description == null) {
            setAlert({
                type: 'error',
                msg: 'Set title and description for livestream'
            })
            return false
        }
    }

    const handleLive = async () => {
        try {
            if (validateSetting() == false) {
                return
            }
            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.CREATING))
            console.log("Prepare go live:", livestream, (platformHelper != null && platformHelper != undefined))
            let res = await platformHelper.goLive(livestream, platform)
    
            if (res == null) {
                dispatch(updateLivestreamStage(LIVESTREAM_STAGE.NON_CREATED))
                return
            }
            res = await axios.post('match/livestream/create', {...match, livestream: res, mode: 'livestream'}, {
                headers: {
                    'x-access-token': token
                }
            })
            //console.log("Create match with livestream", data)
            dispatch(updateMatch(res.data))
            dispatch(updateLivestreamStage(LIVESTREAM_STAGE.READY))
            
            listenLivestreamStatus(res.data)
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

    const listenLivestreamStatus = (createdMatch) => {
        try {
            if (platform == null) {
                return
            }
            var {livestreamId} = createdMatch.livestream
            platformHelper.listenStatus(livestreamId, platform)
                .then((videoUrl) => {
                    
                    if (platform.id == PLATFORM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST) {
                        startMatchOnServer(createdMatch)
                        dispatch(updateLivestreamStage(LIVESTREAM_STAGE.LIVE))
                    } 
                    else {
                        setFbUrl('https://www.facebook.com' + videoUrl)
                        dispatch(updateLivestreamStage(LIVESTREAM_STAGE.LIVE))
                        startMatchOnServer(createdMatch)
                    }
                   
                })
        }
        catch (err) {
            console.log("Error listen:", err);
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
        if (platform == null) {
            return null 
        }
        let videoUrl = null
        // console.log("Video FB Url: ",  `https://www.facebook.com/plugins/video.php?width=1280&href=https%3A%2F%2Fwww.facebook.com${encodeURIComponent(fbUrl)}`)
        switch (platform.id) {
            case PLATFORM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST: 
                videoUrl = `https://www.youtube.com/embed/${livestream.livestreamId}?autoplay=1&mute=1`
                break 
            case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PROFILE:
                //videoUrl = `https://www.facebook.com/plugins/video.php?width=1280&href=https%3A%2F%2Fwww.facebook.com%2F${encodeURIComponent(fbUrl)}`
               // videoUrl = `https://www.facebook.com/${fbUrl}`
                break
            default: 
                break
        }
        return videoUrl
    }

    const handleOpenLinkFB = async () => {

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
                        ...JSON.parse(JSON.stringify(match)), 
                        livestream: setting
                    }))
                }}/>

            <QuestionDetailModal 
                open = {modal.state == 'view_question'}     
                onClose = {() => setModal({})}
            />
            <Topbar
                onOpenLink = {handleOpenLinkFB}
                fbUrl = {fbUrl}
                onSetting = {() => setModal({state: 'setting'})}
                onClickBtn = {handleClickBtn}
            />
            <div className = {classes.body}>
                <Grid container columnSpacing={3} sx = {{height: '100%'}}>
                    <Grid item xs = {9} >
                        {
                            showLivestream 
                            && platform 
                            && platform.id == PLATFORM_ACCOUNT_TYPES_ID.YOUTUBE_BROAD_CAST ? 
                            <div style= {{
                                flex: 1,
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems:"center"
                            }}>

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
