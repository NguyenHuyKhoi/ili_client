import { MoreVert, Star } from '@mui/icons-material'
import {Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { selectGame } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import { theme } from '../../../theme'
import {createUrl} from '../../../util/helper'

import Button from '../../../component/Button'
import { GameCreatorContext } from '../../../context/game/creator/context'
import { startEditGame } from '../../../context/game/creator/actions'
import ActiveDot from '../../../component/ActiveDot'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'row',
        border: 'solid 1px #000000',
        borderRadius: '255px 5px 225px 5px/5px 225px 5px 255px',
        padding: theme.spacing(0.5),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    left: {
        position: 'relative'
    },
    img: {
        height: '100%',
        width: 180,
    },
    right: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    rightTop: {
        flex:1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1.5)
    },
    rightBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.neutral.main,
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(2)
    },
    questionNums: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
        padding: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'black',
        opacity: 0.5,
        zIndex: 99
    }
}))

export const GameRowItem = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const gameDispatch = useContext(GameContext).dispatch
    const gameCreatorDispatch = useContext(GameCreatorContext).dispatch
    const {game} = props
    const {title, questions, owner, image, visibility} = game



    const handleViewDetail = () => {
        gameDispatch(selectGame(game))
        navigate('/game/detail/'+game._id, {replace: false})
    }

    const handleEdit = (e) => {
        e.stopPropagation()
        gameCreatorDispatch(startEditGame(game))
        navigate('/game/creator', {replace: false})
    }

    const handlePlay = (e) => {
        e.stopPropagation()
        gameDispatch(selectGame(game))
        navigate('/match/host/setting', {replace: false})
    }
    return (
        <div className = {classes.container} style={{backgroundColor: '#fff'}}
            onClick={handleViewDetail}>
            <div className = {classes.left}>
                <img className = {classes.img} 
                    src = {createUrl(image)}/>
                <div className = {classes.questionNums}>
                    <Typography variant = 'caption' 
                        sx = {{color: 'white', fontWeight: 'bold'}}> {questions.length} questions </Typography>
                </div>
            </div>
            <div className = {classes.right}>
                <div className = {classes.rightTop}>
                    <Typography variant = 'btnLabel' sx = {{color: '#000', flex: 1}}> 
                        {title}
                    </Typography>

                    <ActiveDot isActive = {visibility == 'public'} labels = {['public', 'private']}/>
                </div>
                <div className = {classes.rightBottom}>
                    <Typography variant = 'label' sx = {{color: '#000', flex: 1}}>
                        {owner.username}
                    </Typography>
                    <Button 
                        variant = 'success' 
                        size = 'small' 
                        style = {{marginLeft: theme.spacing(2)}}
                        label = 'Edit'
                        onClick = {handleEdit}/>

                  <Button 
                        variant = 'primary' 
                        size = 'small' 
                        style = {{marginLeft: theme.spacing(2)}}
                        label = 'Play'
                        onClick = {handlePlay}/>
                </div>
            </div>
        </div>
    )
}