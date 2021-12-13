import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { GameRowItem } from '../../../game/component/GameRowItem'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: grey[100],
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

const GameList = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div className = {classes.list} >
            {
                Array.from(Array(3)).map((_, index) => (
                    <div className = {classes.item}>
                        <GameRowItem/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default GameList
