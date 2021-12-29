import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: theme.spacing(1)
    },
    scoreContainer: {
        width: theme.spacing(15),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: theme.spacing(0.5)
    }
}))


const BottomBar = (props) => {
    const classes = useStyles()
    const {player} = props 
    const {name, score} = player
    return (
        <div className = {classes.container}>
            <Typography variant = 'h6' sx = {{flex: 1, color: 'black'}}> 
                {name}
             </Typography>
            <div className = {classes.scoreContainer} >
                <Typography variant = 'h6' sx = {{fontWeight: 'bold', color: 'white'}}>
                    {score}
                </Typography>
            </div>
       </div>
    )
}

export default BottomBar
