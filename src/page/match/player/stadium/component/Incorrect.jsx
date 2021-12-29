import { ClearTwoTone } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex:1,
        height:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#46178f'
    },
    msg: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
        borderRadius: theme.spacing(0.8),
        marginTop: theme.spacing(2)
    },
    img: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        borderRadius: theme.spacing(6),
        border: '6px solid #ffffff',
        backgroundColor: '#D01937',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(2)
    }
}))
const Incorrect = (props) => {
    const classes = useStyles()
        return (
            <div className = {classes.container}>
            <Typography variant = 'h4' sx = {{fontWeight: 'bold', color: 'white'}}> 
                Incorrect
            </Typography>
            <div className = {classes.img}>
                <ClearTwoTone sx = {{color: 'white', fontSize: 50}}/>
            </div>
            <div className = {classes.msg}>
                <Typography variant = 'h6' sx = {{fontWeight: 'bold', color: 'white'}}>
                    No one said it would be easy ;)
                </Typography>
            </div>  
        </div>
    )
}

export default Incorrect
