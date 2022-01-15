import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../../../component/HeaderBar'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        height: '100vh'
    },
    body: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    }
}))

const DiscoverPage = () => {
    const navigate = useNavigate()
    const classes = useStyles()

    const handleSearch = () => {
        navigate('/game/search', {replace: true})
    }
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {1}/>
            <div className= {classes.body}>
            </div>
       
        </div>
    )
}

export default DiscoverPage
