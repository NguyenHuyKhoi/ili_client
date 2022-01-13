import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.palette.success.main,
        alignItems: 'center',
        padding: theme.spacing(1),
        border: 'solid 2px #000000',
        borderRadius: '255px 5px 225px 5px/5px 225px 5px 255px',
    },
    score: {
        width: theme.spacing(16),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(0.2),
        backgroundColor: theme.palette.secondary.main,
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
    }
}))


const BottomBar = (props) => {
    const classes = useStyles()
    const {player} = props 
    const {username, score} = player
    return (
        <div className = {classes.container}>
            <Typography variant = 'header' sx = {{flex: 1, color: '#000'}}> 
                {username}
             </Typography>
            <div className = {classes.score} >
                <Typography variant = 'header' sx = {{color: '#000'}}>
                    {score}
                </Typography>
            </div>
       </div>
    )
}

export default BottomBar
