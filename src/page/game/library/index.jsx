import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../../../component/HeaderBar'
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

    const handleGoCreate = () => {
        navigate('/game/creator', {replace: false})
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
