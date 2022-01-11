import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import HeaderBar from '../../../component/HeaderBar'
import { CollectionContext } from '../../../context/collection/context'
import { theme } from '../../../theme'
import CollectorInfor from './component/CollectorInfor'
import GameList from './component/GameList'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))

const CollectionDetailPage = () => {
    const classes = useStyles()
    const {collection} = useContext(CollectionContext)
    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <Grid container >
                <Grid item sm={3} >
                    <CollectorInfor collection = {collection}/>
                </Grid>
                <Grid item sm={9}>
                    <GameList collection = {collection}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CollectionDetailPage
