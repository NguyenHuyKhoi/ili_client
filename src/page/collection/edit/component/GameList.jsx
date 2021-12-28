import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { GameRowItem } from '../../../game/component/GameRowItem'
import { GameItem } from './GameItem'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display: 'flex',
        flexDirection:'column',
    },
    list: {
        display:'flex',
        flexDirection:'column'
    },
    item: {
        marginBottom: theme.spacing(2),
        display:'flex',
        flexDirection:'column'
    },
}))

const GameList = (props) => {
    const classes = useStyles()
    const {games} = props
    return (
        <div className = {classes.container}>
            <div className = {classes.list} >
            {
                games.map((game, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <GameItem game = {game} isAdded = {true}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default GameList
