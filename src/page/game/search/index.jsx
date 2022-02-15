import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import HeaderBar from '../../../component/HeaderBar'
import { getGamesSuccess } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import { theme } from '../../../theme'
import GameFilter from './component/GameFilter'
import GameList from './component/GameList'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
    },
    body: {
        backgroundColor: theme.palette.background.main,
        height: '92vh',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(5)
    }
}))

const SearchPage = () => {
    const classes = useStyles()
    const {dispatch, games} = useContext(GameContext)
    useEffect(() => {
        handleSearch({})
        return () => {
            
        }
    }, [])
    
    const handleSearch = (params) => {
        axios.get('game/search', {
            params
        })
        .then ((res) => {
            console.log("Get game with params: ", params)
            dispatch(getGamesSuccess(res.data))
        })
        .catch((err) => {
            console.log("Search game error:", err)
            dispatch(getGamesSuccess([]))
        })
    }

    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {1}/>
            <Grid container>
                <Grid item sm={2} sx = {{h: '100%'}}>
                 <GameFilter onSearch = {handleSearch}/>
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

export default SearchPage
