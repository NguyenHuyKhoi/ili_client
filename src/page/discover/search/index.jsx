import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
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
    const handleSearch = () => {
        navigate('/search', {replace: false})
    }
    return (
        <div className = {classes.container}>
            <GameFilter onClick = {handleSearch}/>
            <GameList/>
        </div>
    )
}

export default SearchPage
