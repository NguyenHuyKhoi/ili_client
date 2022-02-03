import { AppBar, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { GameCreatorContext } from '../../../../context/game/creator/context'
import logo from '../../../../asset/image/logo.png'
import { useNavigate } from 'react-router-dom'
import { DEFECTIVE_CHECK_TYPES, QuestionCreatorContext } from '../../../../context/question/creator/context'
import { showDefectiveQuestions } from '../../../../context/question/creator/actions'
import Button from '../../../../component/Button'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: 'white',
        height: theme.spacing(8)
    },
    logo: {
        height: theme.spacing(6),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    settingBox: {
        display: 'flex',
        width: theme.spacing(40),
        justifyContent:'space-between',
        flexDirection:'row',
        marginLeft: theme.spacing(2),
        padding: theme.spacing(0.2),
        paddingLeft: theme.spacing(1.5),
        alignItems: 'center',
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
    },
    title: {
        color: '#000'
    }
}))

const Topbar = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {game} = useContext(GameCreatorContext)
    const {showDefectives, defectiveQuestions} = useContext(QuestionCreatorContext)
    const questionCreatorDispatch = useContext(QuestionCreatorContext).dispatch
    const {title} = game

    const handleShowDefectiveQuestions = () => {
        if (showDefectives != DEFECTIVE_CHECK_TYPES.NOT_CHECK && defectiveQuestions.length == 0) {
            console.log("No need check anymore");
            return 
        }
        questionCreatorDispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.CHECK_AND_SHOW))
    }
    return (
        <AppBar position = 'fixed'>
            <Toolbar className = {classes.toolbar}>
                <div onClick = {() => navigate('/', {replace: true})}>
                    <img src = {logo} className = {classes.logo} alt = 'Logo' />
                </div>
                <div style = {{flex: 1}}/>
                <div onClick = {handleShowDefectiveQuestions}>
                    <Typography variant = 'label' sx = {{
                        color: showDefectives == DEFECTIVE_CHECK_TYPES.NOT_CHECK || defectiveQuestions.length > 0 ? 
                            theme.palette.error.main
                        :
                            theme.palette.success.main,
                        '&:hover': {
                                cursor: 'pointer'
                            }
                    }}>
                        {
                            showDefectives == DEFECTIVE_CHECK_TYPES.NOT_CHECK ? 'Check incomplete questions' : 
                            defectiveQuestions.length > 0 ? 'Incomplete questions: ' + defectiveQuestions.length : 
                            'All questions are completed.'
                        }
                    </Typography>
                </div>
                <Button 
                    variant="success" 
                    size = 'small'
                    style = {{ marginLeft: theme.spacing(5)}}
                    onClick = {() => {
                        if (props.onSave) props.onSave()
                    }}
                    label = 'Save'/>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar
