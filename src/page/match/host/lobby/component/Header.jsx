import { Fullscreen, Language, MusicNote, VolumeDown } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import { theme } from '../../../../../theme'
import { MatchPlayContext } from '../../../../../context/match/play/context'
import qr_sample from '../../../../../asset/image/qr_sample.jpg'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1.5)
    },
    langContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(0.5),
        borderRadius: theme.spacing(3),
        alignSelf: 'flex-start',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    pinContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(1.5),
        height: theme.spacing(18),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    btns:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    btnIcon: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: theme.spacing(2),
        backgroundColor: 'white',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    qr: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        borderRadius: theme.spacing(1),
        backgroundColor: 'white',
        padding: theme.spacing(1),
        marginLeft: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    left: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2)
    },
    right: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2)
    },
    center: {
        alignSelf: 'baseline',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}))
export const Header = (props) => {
    const classes = useStyles()
    const {showQR} = props 
    const {match} = useContext(MatchPlayContext)
    const {pinCode} = match
    return (
        <div className = {classes.container}>   
            <div className = {classes.left}>
                <div className = {classes.langContainer}>
                    <Language   sx = {{color: 'black', fontSize: 25}} />
                    <Typography variant = 'subtitle1' sx  ={{ml: theme.spacing(1),fontWeight: 'bold', color: '#333333'}}>
                        EN
                    </Typography>
                </div>
            </div>

            <div className = {classes.center}>
                <div className = {classes.pinContainer}>
                    <Typography variant = 'h6' sx  ={{ color: '#333333', fontWeight: 500}}>
                        Game pin
                    </Typography>
                    <Typography variant = 'h1'  sx  ={{ color: '#333333', fontWeight: 'bold'}}> 
                        {
                            pinCode == undefined || pinCode == null ? 'XXXXXX' : pinCode + ' 1234'
                        }
                    </Typography>
                </div>
                {
                    showQR && 
                    <div onClick = {() => {
                        if (props.onSelectQR) props.onSelectQR()
                    }}>
                        <img src = {qr_sample} className= {classes.qr}/>
                    </div>
                }
              
              
            </div>

            <div className = {classes.right}>
                <div className = {classes.btnsContainer}>
                    <div className = {classes.btnIcon}>
                        <Fullscreen sx = {{color: 'black', fontSize: 20}} />
                    </div>
                    <div className = {classes.btnIcon}>
                        <MusicNote sx = {{color: 'black', fontSize: 20}}/>
                    </div>
                    <div className = {classes.btnIcon}>
                        <VolumeDown sx = {{color: 'black', fontSize: 20}} />
                    </div>
                </div>
            </div>
         
            
           
        </div>
    )
}

export default Header
