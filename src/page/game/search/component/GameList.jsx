import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import EmptyBox from '../../../../component/EmptyBox'
import { GameContext } from '../../../../context/game/other/context'
import { theme } from '../../../../theme'
import GameCellItem from '../../../game/component/GameCellItem'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    list: {
        display:'flex',
        flexDirection:'column'
    }
}))

const GameList = (props) => {
    const classes = useStyles()
    const {games} = useContext(GameContext)

    return (
        <div className = {classes.container}>

            {
                games !== undefined && games.length === 0? 
                    <EmptyBox label = "No any games..."
                        style = {{width: '85%', alignSelf: 'center', marginTop: theme.spacing(3)}}/>
                    :
                    <div className={classes.list}>
                    <Grid container sx = {{flex: 1}} columnSpacing = {4} rowSpacing = {4}>
                        {
    
                            games.map((game, index) => (
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

export default GameList
