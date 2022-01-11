import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import HeaderBar from '../../../component/HeaderBar'
import GameList from './component/GameList'
import SideMenu from './component/SideMenu'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#f2f2f2'
    }
}))

const GameLibraryPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {2}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu selectedIndex = {0}/>
                </Grid>
                <Grid item sm={10}>
                    <GameList/>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameLibraryPage
