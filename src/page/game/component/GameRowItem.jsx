import { MoreVert, Star } from '@mui/icons-material'
import { Avatar, Button, Link, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { selectGame } from '../../../context/game/other/actions'
import { GameContext } from '../../../context/game/other/context'
import { theme } from '../../../theme'
import {createUrl} from '../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'white',
        padding: theme.spacing(0.5)
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
        backgroundColor: 'white',
        padding: theme.spacing(1.5)
    },
    rightBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: grey[100],
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
    },
    draftTag: {
        position: 'absolute',
        top: theme.spacing(0.5),
        left: theme.spacing(0.5),
        padding: theme.spacing(0.4),
        paddingLeft: theme.spacing(0.6),
        paddingRight: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'red',
        opacity: 0.8,
        zIndex: 99
    },
}))

export const GameRowItem = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {dispatch} = useContext(GameContext)
    const {game} = props
    const {title, questions, owner, image} = game
    const handleSelect = () => {
        dispatch(selectGame(game))
    }


    const handleViewDetail = () => {
        handleSelect()
        navigate('/game/detail/'+game._id, {replace: false})
    }

    const handleEdit = (e) => {
        e.stopPropagation()
        handleSelect()
        navigate('/game/creator', {replace: false})
    }

    const handlePlay = (e) => {
        e.stopPropagation()
        handleSelect()
        navigate('/match/host/setting', {replace: false})
    }
    return (
        <div className = {classes.container} style={{backgroundColor: props.selected ? grey[100]:'white'}}
            onClick={handleViewDetail}>
            <div className = {classes.left}>
                <img className = {classes.img} 
                    src = {createUrl(image)}/>
                <div className = {classes.questionNums}>
                    <Typography variant = 'caption' 
                        sx = {{color: 'white', fontWeight: 'bold'}}> {questions.length} questions </Typography>
                </div>
                <div className = {classes.draftTag}>
                    <Typography variant = 'caption' sx = {{color: 'white'}}> Draft </Typography>
                </div>
            </div>
            <div className = {classes.right}>
                <div className = {classes.rightTop}>
                    <Typography variant = 'subtitle1' sx = {{color: '#333333', fontWeight: 'bold', flex: 1}}> 
                        {title}
                    </Typography>
                    <Star sx = {{color: '#C79200'}} />
                </div>
                <div className = {classes.rightBottom}>
                    <Avatar src = {createUrl(owner.avatar)} sx={{ width: 24, height: 24 }}  />
                    <Typography variant = 'subtitle1' sx = {{color: '#7D7D7D', flex: 1, ml: theme.spacing(1)}}>
                        {owner.username}
                    </Typography>
                    <Button variant = 'contained' size = 'small' color = 'primary' 
                        sx = {{ml: theme.spacing(2), fontWeight: 'bold', textTransform: 'none'}}
                        onClick = {handleEdit}>Edit </Button>
                    <Button variant = 'contained' size = 'small' color = 'success' 
                        sx = {{ml: theme.spacing(2), fontWeight: 'bold', textTransform: 'none'  }}
                        onClick = {handlePlay}>Play </Button>
                </div>
            </div>
        </div>
    )
}