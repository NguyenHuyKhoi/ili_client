import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { updateMatch } from '../../../context/match/livestream/actions'
import { MatchLivestreamContext } from '../../../context/match/livestream/context'
import MatchStatus from './component/MatchStatus'
import QuestionDetailModal from './component/QuestionDetailModal'
import SettingModal from './component/SettingModal'
import TemplateSlider from './component/TemplateSlider'
import Topbar from './component/Topbar'

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
    const {dispatch, match} = useContext(MatchLivestreamContext)
    const [modal, setModal] = useState({})
    const handleLive = () => {

    }
    const images = [
        { url: "https://image.freepik.com/free-photo/chinese-new-year-still-life-tiger-celebration_23-2149210715.jpg" },
        { url: "https://image.freepik.com/free-photo/neon-frame-surrounded-by-balloons-color-year-2022_23-2149217418.jpg" },
        { url: "https://image.freepik.com/free-vector/2022-tiger-year-greeting-card_317396-1413.jpg" }
      ];
    return (
        <div className = {classes.container}>
            <SettingModal 
                setting = {match}
                open = {modal.state == 'setting'}     
                onClose = {() => setModal({})}
                onCancel = {() => setModal({})}
                onDone = {(setting) => {
                    setModal({})
                    dispatch(updateMatch(setting))
                }}/>

            <QuestionDetailModal 
                open = {modal.state == 'view_question'}     
                onClose = {() => setModal({})}
            />
            <Topbar
                onSetting = {() => setModal({state: 'setting'})}
                onLive = {handleLive}
            />
            <div className = {classes.body}>
                <Grid container columnSpacing={3} sx = {{height: '100%'}}>
                    <Grid item xs = {9} >
                        <TemplateSlider/>
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
