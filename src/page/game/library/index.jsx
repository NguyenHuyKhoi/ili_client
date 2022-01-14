import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../../../component/HeaderBar'
import { AuthContext } from '../../../context/auth/context'
import { getGamesSuccess } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import GameList from './component/GameList'
import SideMenu from './component/SideMenu'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white'
    }
}))

const GameLibraryPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {dispatch} = useContext(GameContext)
    const {token} = useContext(AuthContext)
    useEffect(() => {
        axios.get('game/library', {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            console.log("Get games library:", res.data)
            dispatch(getGamesSuccess(res.data))
        })
        .catch((err) => {
            console.log("Get games library err:", err.response)
        })
        return () => {
            
        }
    }, [])
    const handleGoCreate = () => {
        navigate('/game/creator', {replace: true})
    }
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {2}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu selectedIndex = {0}/>
                </Grid>
                <Grid item sm={10}>
                    <GameList onClickEmpty = {handleGoCreate}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameLibraryPage
