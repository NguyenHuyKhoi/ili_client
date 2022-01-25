import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '../../../component/Link'
import { selectGame } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import { createUrl } from '../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        borderRadius: theme.spacing(1),
        boxShadow: '1px 3px 6px #5f5f5f',
        overflow: 'hidden'
    },
    body: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1),
        backgroundColor: 'white',
    },
    header: {
        position: 'relative',
        height: theme.spacing(20),
    },
    img: {
        width: '100%',
        height: '100%'
    },
    questionNums: {
        position: 'absolute',
        bottom: theme.spacing(1),
        right: theme.spacing(1),
        padding: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'black',
        opacity: 0.6,
        zIndex: 99
    },
    infor: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginLeft: theme.spacing(1)
    },
}))

export const GameCellItem = (props) => {
    const navigate = useNavigate()
    const {game} = props 
    const {dispatch} = useContext(GameContext)
    const {title, image, owner, questions} = game
    const classes = useStyles()
    const handleSelect = () => {
        dispatch(selectGame(game))
        navigate('/game/detail/'+game._id, {replace: false})
    }


    const limitTitle = title != null? title.substring(0, 20) + (title.length < 20? '' :'...') : 'Collection'
    return (
        <div className = {classes.container} >
            <div className = {classes.header} >
                <img className = {classes.img} src = {createUrl(image)}
                    onClick = {handleSelect}
                    alt = 'Cover'/>
                <div className= {classes.questionNums} >
                    <Typography variant = 'caption' 
                        sx = {{color: 'white', fontWeight: 'bold'}}> {questions.length} questions </Typography>
                </div>
            </div>
         
            <div className = {classes.body}>
                <div className = {classes.infor}>
                    <Typography variant = {'btnLabel'} sx = {{color: '#000'}}>
                        {limitTitle}
                    </Typography>
                    <Link label = {owner.username} link = {'/profiles/'+ game.owner._id}/>
                 
                </div>  
            </div>
        </div>
    )
}
export default GameCellItem
