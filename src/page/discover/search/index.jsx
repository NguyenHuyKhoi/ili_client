import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth/context'
import { getGamesSuccess } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import GameFilter from '../component/GameFilter'
import GameList from './component/GameList'
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
    const {token} = useContext(AuthContext)
    const {dispatch, games} = useContext(GameContext)
    useEffect(() => {
        handleSearch()
        return () => {
            
        }
    }, [])
    const handleSearch = () => {
        axios.get('game/search', {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            dispatch(getGamesSuccess(res.data))
        })
    }

    return (
        <div className = {classes.container}>
            <GameFilter onSearch = {handleSearch}/>
            <GameList games = {games}/>
        </div>
    )
}

export default SearchPage
