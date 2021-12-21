import { makeStyles } from '@mui/styles'
import React, {useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import GameFilter from '../component/GameFilter'
import GameList from './component/GameList'
import {AuthContext} from '../../../context/auth/context'
import { searchGamesAPI } from '../../../context/game/other/apiCalls'
import { GameContext } from '../../../context/game/other/context'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: theme.spacing(8),
        paddingTop: theme.spacing(3),

    }
}))

const SearchPage = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {user} = useContext(AuthContext)
    const {dispatch, games} = useContext(GameContext)
    useEffect(() => {
        handleSearch()
        return () => {
            
        }
    }, [])
    const handleSearch = () => {
        console.log("Call search api")
        searchGamesAPI(user.accessToken, dispatch)
    }

    return (
        <div className = {classes.container}>
            <GameFilter onSearch = {handleSearch}/>
            <GameList games = {games}/>
        </div>
    )
}

export default SearchPage
