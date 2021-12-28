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
        flex: 1,
        backgroundColor: '#f2f2f2',
        height: '100vh'
    }
}))

const CollectionDetailPage = () => {
    const classes = useStyles()
    const {collection} = useContext(CollectionContext)
    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <Grid container sx = {{p: theme.spacing(2), pt: theme.spacing(4)}}>
                <Grid item sm={4} >
                    <CollectorInfor collection = {collection}/>
                </Grid>
                <Grid item sm={8}>
                    <GameList collection = {collection}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CollectionDetailPage
