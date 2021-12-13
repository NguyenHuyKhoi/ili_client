import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import CollectorInfor from './component/CollectorInfor'
import GameList from './component/GameList'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const CollectionDetailPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            {/* <Topbar/> */}
            <Grid container>
                <Grid item sm={3} >
                    <CollectorInfor/>
                </Grid>
                <Grid item sm={9}>
                    <GameList/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CollectionDetailPage
