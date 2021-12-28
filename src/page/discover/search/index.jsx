import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../../../component/HeaderBar'
import { AuthContext } from '../../../context/auth/context'
import { getGamesSuccess } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import GameFilter from '../component/GameFilter'
import GameList from './component/GameList'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,

    },
    body: {
        backgroundColor: '#f2f2f2',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(10),
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
            <HeaderBar selectedIndex = {1}/>
            <div className= {classes.body} >
                <GameFilter onSearch = {handleSearch}/>
                <GameList games = {games}/>
            </div>
         
        </div>
    )
}

export default SearchPage
