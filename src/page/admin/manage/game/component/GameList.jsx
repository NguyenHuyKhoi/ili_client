import { makeStyles } from '@mui/styles'
import React from 'react'
import EmptyBox from '../../../../../component/EmptyBox'
import { theme } from '../../../../../theme'
import GameRowItem from './GameRowItem'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection:'column',
    },
    list: {
        display:'flex',
        flexDirection:'column'
    },
    item: {
        marginBottom: theme.spacing(4),
        display:'flex',
        flexDirection:'column'
    },
    emptyContainer: {
        display: 'flex',
        height: '70vh',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        border: '1px dashed gray'
    },
    emptyImg: {
        width: theme.spacing(20),
        aspectRatio: 1.6
    }
}))


const GameList = (props) => {
    const classes = useStyles()
    const {games} = props
    return (
        <div className = {classes.container}>
            <div className = {classes.list} >
            {
                games.length ===0 ? 
                <EmptyBox
                    style= {{width: '100%', marginTop: theme.spacing(5)}}
                    label = " Users have not create any games..."
                    onClick = {() => {
                        if (props.onClickEmpty) props.onClickEmpty()
                    }}/>
                :
                games.map((item, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <GameRowItem game = {item}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default GameList
