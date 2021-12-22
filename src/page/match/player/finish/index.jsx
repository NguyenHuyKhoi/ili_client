import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import PlayerRank from './component/PlayerRank'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'purple',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex:1,
    },
    titleContainer: {
        padding: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
    },
    list: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(15)
    },
    item: {
        marginBottom: theme.spacing(2)
    }
}))

const MatchPlayerFinishPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div className = {classes.header} >
                <div className = {classes.titleContainer}>
                    <Typography variant = 'h6' sx = {{color: 'black', fontWeight: 'bold'}}>
                        Title Game
                    </Typography>
                </div>
            </div>
            <div className = {classes.body}>
                <div className = {classes.list}>
                    {
                        Array.from(Array(3)).map((_, index) => (
                            <div className = {classes.item}   key = {''+index}>
                                <PlayerRank widthPercent = { index < 5? 100 - index *10 : 50  }/>
                            </div>
                        ))
                    }
                </div>  
            </div>
           
        </div>
    )
}

export default MatchPlayerFinishPage
