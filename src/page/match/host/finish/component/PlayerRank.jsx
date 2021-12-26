import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1.5),
        backgroundColor: 'red',
        justifyContent: 'space-between',
        borderRadius: theme.spacing(1)
    },
    infor: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    score: {
        padding: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        marginLeft: theme.spacing(2)
    }
}))

const PlayerRank = (props) => {
    const classes = useStyles() 
    const {player, index} = props 
    const {name, score} = player 
    return (
        <div className = {classes.container} style = {{
            width: `${props.widthPercent}%`
        }}>
            <div className = {classes.infor}>
                <Typography variant = 'h4' sx = {{color: 'white', fontWeight: 'bold'}}>
                    {index}
                </Typography>
                <div className = {classes.score}>
                    <Typography variant = 'h6' sx = {{color: 'black', fontWeight: 'bold'}}>
                        {score}
                    </Typography>
                </div>
            </div>
          
            <Typography variant = 'h4' sx = {{color: 'white', fontWeight: 'bold'}}>
                {name}
            </Typography>
        </div>
    )
}


export default PlayerRank
