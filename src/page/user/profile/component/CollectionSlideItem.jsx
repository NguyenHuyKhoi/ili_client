import { Grid, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import EmptyBox from '../../../../component/EmptyBox'
import { theme } from '../../../../theme'
import GameCellItem from '../../../game/component/GameCellItem'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    list: {
        display:'flex',
        flexDirection:'column',
        marginTop: theme.spacing(1.5)
    }
}))

const CollectionSlideItem = (props) => {
    const classes = useStyles()
    const {collection} = props
    const {title, games} = collection
    return (
        <div className = {classes.container}>
            
            <div className = {classes.header} > 
                <Typography variant = 'btnLabel' sx = {{color: '#000'}}>
                    {`${title} ( ${games.length} games )` }
                </Typography>
                <Link underline = 'alway' href = {'/collection/detail/' + collection._id}
                    sx = {{fontSize: 20, color: '#000'}}>
                    See all
                </Link>
            </div>
            {
                games.length===0? 
                    <EmptyBox
                        style = {{width: '85%', alignSelf: 'center', marginTop: theme.spacing(3)}}
                        label = 'Collections has no games'/>
                     :
                    <div className={classes.list}>
                     <Grid container sx = {{flex: 1}} columnSpacing = {4}>
                         {
                             games.slice(0, Math.min(games.length, 4)).map((game, index) => (
                                 <Grid item xs = {3}  key = {''+index}>
                                     <GameCellItem 
                                         game = {game}/>
                                 </Grid>
                             ))
                         }
                     </Grid>
                 </div>
            }

        </div>
    )
}

export default CollectionSlideItem
