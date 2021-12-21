import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../../../component/HeaderBar'
import GameFilter from '../component/GameFilter'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: grey[300]
    }
}))

const DiscoverPage = () => {
    const navigate = useNavigate()
    const classes = useStyles()

    const handleSearch = () => {
        navigate('/discover/search', {replace: true})
    }
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {1}/>
            <GameFilter onSearch = {handleSearch}/>
        </div>
    )
}

export default DiscoverPage
