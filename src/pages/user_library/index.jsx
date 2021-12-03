import { Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import GameLibrary from './components/GameLibrary'
import SideMenu from './components/SideMenu'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const UserLibrary = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            {/* <Topbar/> */}
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu/>
                </Grid>
                <Grid item sm={10}>
                    <GameLibrary/>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserLibrary
