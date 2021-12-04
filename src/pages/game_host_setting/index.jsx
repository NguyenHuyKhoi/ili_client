import { ArrowDropDown, ArrowLeft } from '@mui/icons-material'
import { Alert, Button, Container, Divider, Grid, Snackbar, Switch, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { theme } from '../../theme'
import Header from './components/Header'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'purple'
    },
    body: {
        flex: 1,
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(40),
        paddingRight: theme.spacing(40)
    },
    titleContainer: {
        padding: theme.spacing(1.5),
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modesContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(10)
    },
    gameMode: {
        height: theme.spacing(20),
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        padding: theme.spacing(1.5),
        paddingTop: theme.spacing(6)
    },
    gameModeLogo: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        borderRadius: theme.spacing(5),
        position: 'absolute',
        top: theme.spacing(-5),
        left: 0,
        right: 0,
        margin: 'auto'
    },
    gameModeInfor: {
        flex: 1, 
        flexDirection: 'column'
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(10)
    },
    optionContainer: {
        marginBottom: theme.spacing(0.5)
    },
    gameOption: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(52,52,52,0.8)',
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1),
    },
    gameOptionInfor: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    optionsHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        backgroundColor: 'white',
        marginBottom: theme.spacing(2)
    }
}))

const GameOption = () => {
    const classes = useStyles()
    return (
        <div className = {classes.gameOption}>
            <div className = {classes.gameOptionInfor}>
                <Typography variant = 'h6' sx = {{color: 'white', fontWeight: 'bold'}}>
                    Game option title
                </Typography>
                <Typography variant = 'subtitle1' sx = {{color: 'white'}}>
                    Game option description,  Game option description,  Game option description
                </Typography>
            </div>
            <Switch {...{inputProps: {'aria-label': 'Turn on/off'}}} defaultChecked />
        </div>
    )
}
const GameMode = () => {
    const classes = useStyles()
    return (
        <div className = {classes.gameMode}>
            <img src = 'https://dothethao.net.vn/wp-content/uploads/2020/06/logo-ha-noi-fc.jpg' className = {classes.gameModeLogo}/>
            <div className = {classes.gameModeInfor}>
                <Typography variant = 'h6' 
                    sx = {{
                        color: 'white', fontWeight: 'bold', alignSelf: 'center', textAlign: 'center'}}>
                    Mode Title
                </Typography>
                <Typography variant = 'subtitle1' 
                    sx = {{
                        color: 'white', alignSelf: 'center', textAlign: 'center', my: theme.spacing(1), 
                            px: theme.spacing(6)}}>
                    Lorem ipsum dolor sit amet consrat quam quibusdam. uam quibusdam.
                </Typography>
            </div>
      

            <Button variant = 'contained'>
                Choose Mode
            </Button>
        </div>
    )
}
const GameHostSetting = () => {
    const classes = useStyles()
    const [showOptions, setShowOptions] = useState(false)
    const handleShowOptions = () => {
        setShowOptions(!showOptions)
    }
    return (
        <div className = {classes.container}>
            <Header/>
            <div className = {classes.body}>
                <div className = {classes.titleContainer}>
                    <Typography variant = 'h5' sx = {{color: 'black', fontWeight: 'bold'}}>
                        Game Title
                    </Typography>
                </div>
                <div className = {classes.modesContainer}>
                    <Grid container columnSpacing = {6} rowSpacing = {6}>
                        {
                            Array.from(Array(4)).map((_, index) => (
                                <Grid item xs = {6}>

                                    <GameMode/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
                <div className = {classes.optionsContainer}>
                    <div className = {classes.optionsHeader}>
                        <Typography variant = 'h6' sx = {{color: 'black', fontWeight: 'bold', flex: 1}}>
                            Game options
                        </Typography>
                        {
                            !showOptions? 
                            <ArrowLeft onClick = {handleShowOptions} sx = {{color: 'black', fontSize: 30}}/>
                            :
                            <ArrowDropDown onClick = {handleShowOptions} sx = {{color: 'black', fontSize: 30}}/>
                        }
                      
                    </div>
                    {
                        showOptions && 
                        Array.from(Array(4)).map((_, index) => (
                            <div className = {classes.optionContainer}>
                                <GameOption/>
                            </div>
                        ))
                    }
                </div>
            </div>  
        </div>
    )
}

export default GameHostSetting
