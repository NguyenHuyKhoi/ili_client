import { Button, Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { MatchClassicContext } from '../../../../context/match/classic/context'
import { theme } from '../../../../theme'
import TopPlayerCard from '../../host/hall/component/TopPlayerCard'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        backgroundColor: '#46178f',
        flexDirection: 'column'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3)
    },
    center: {
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7)
    },
    players: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
    }
}))

const MatchPlayerHallPage = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const  {match} = useContext(MatchClassicContext)
    const {players} = match
    const handleNext = () => {
        navigate('/match/player/entrance')
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'h4' sx = {{fontWeight: 600, color: 'white'}}>
                    Hall Of Fame
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.players}>
                    {
                        players.map((player, index) => (
                            <div style = {{}}>
                                <TopPlayerCard player = {player}
                                    highlight = {index == 0}/>
                            </div>
                        ))
                    }
                </div>
                <Button variant = 'contained' 
                    color = 'info'
                    sx = {{
                        fontWeight: 'bold', textTransform: 'none', color: 'white',
                        position: 'absolute',
                        right: theme.spacing(2),
                        top: theme.spacing(2),
                    }}
                    onClick = {handleNext}
                >
                    Play Again
                </Button>
             
            </div>
       </div>
    )
}

export default MatchPlayerHallPage
