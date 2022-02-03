import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../../../component/Button'
import HeaderBar from '../../../../component/HeaderBar'
import SideMenu from '../../../../component/SideMenu'
import { AuthContext } from '../../../../context/auth/context'
import { getGamesSuccess } from '../../../../context/game/other/actions'
import { GameContext } from '../../../../context/game/other/context'
import { theme } from '../../../../theme'
import { ADMIN_MANAGE_MENUS } from '../user'
import GameList from './component/GameList'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(3)
    },
}))


const AdminGameManagePage = () => {
    const classes = useStyles()
    const [modal, setModal] = useState({})
    const {games, dispatch} = useContext(GameContext)
    const {token} = useContext(AuthContext)
    useEffect(() => {
        getGames()
        return () => {
            
        }
    }, [])

    const getGames = () => {
        axios.get('game/all', {
            headers: {
                'x-access-token': token
            }
        }) 
        .then ((res) => {
            console.log("get games:", res.data);
            dispatch(getGamesSuccess(res.data))
        })   
        .catch((err) => {
            console.log("Get games error", err);
        })
    }

    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {0}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu 
                        selectedIndex = {1}
                        menus = {ADMIN_MANAGE_MENUS}
                        onSelectItem = {() => {}}/>
                </Grid>
                <Grid item sm={10} sx = {{
                    backgroundColor: theme.palette.background.main, height: '92vh'
                }}>
                    <div className= {classes.body}>
            
                        <GameList games = {games}/>
                    </div>
                
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminGameManagePage
