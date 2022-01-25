import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import EmptyBox from '../../../../component/EmptyBox'
import { GameContext } from '../../../../context/game/other/context'
import { theme } from '../../../../theme'
import { GameRowItem } from '../../component/GameRowItem'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        height: '100vh',
        display: 'flex',
        flexDirection:'column',
        backgroundColor: theme.palette.background.main
    },
    games: {
        display:'flex',
        flexDirection:'column',
        marginTop: theme.spacing(5)
    },
    gameContainer: {
        marginBottom: theme.spacing(5),
        display:'flex',
        flexDirection:'column'
    },
    tabsContainer: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        alignSelf:'baseline'
    },
}))


const GameList = (props) => {
    const classes = useStyles()
    const {games} = useContext(GameContext)
    return (
        <div className = {classes.container}>
            {
                games !== undefined && games.length === 0 ?
                <EmptyBox
                    style= {{width: '100%', marginTop: theme.spacing(5)}}
                    label = " You don't have yet any games. Create one?"
                    onClick = {() => {
                        if (props.onClickEmpty) props.onClickEmpty()
                    }}/>
                :
                <div className = {classes.games} >
                    {
                        games.map((item, index) => (
                            <div className = {classes.gameContainer}   key = {''+index}>
                                <GameRowItem game = {item}/>
                            </div>
                        ))
                    }
                    </div>
            }
            
        </div>
    )
}

export default GameList
