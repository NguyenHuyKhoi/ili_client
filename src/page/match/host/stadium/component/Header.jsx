import { Fullscreen, MusicNote } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: theme.spacing(1)
    },
    btns:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    btnIcon: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: theme.spacing(2),
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    },
}))
const Header = (props) => {
    const classes = useStyles()
    const {questionIndex, question_total} = props
    return (
        <div className = {classes.container}>
            <Typography variant = 'h6' sx = {{color: '#333333', fontWeight: 'bold'}}> 
                {`${questionIndex}/${question_total}`}
            </Typography>
            <div className = {classes.btns}>
                <div className = {classes.btnIcon}>
                    <Fullscreen sx = {{color: 'white', fontSize: 25}} />
                </div>
                <div className = {classes.btnIcon} style = {{marginLeft: theme.spacing(2)}}>
                    <MusicNote sx = {{color: 'white', fontSize: 25}}/>
                </div>
            </div>
        </div>
    )
}

export default Header
