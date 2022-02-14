import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../../component/Button'
import VisibilityLabel from '../../../../../component/VisibilityLabel'
import { AuthContext } from '../../../../../context/auth/context'
import { GameCreatorContext } from '../../../../../context/game/creator/context'
import { selectGame } from '../../../../../context/game/other/actions'
import { GameContext } from '../../../../../context/game/other/context'
import { theme } from '../../../../../theme'
import { createUrl } from '../../../../../util/helper'
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
        aspectRatio: 1.6,
        width: 180,
        objectFit: 'center'
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
    const {token} = useContext(AuthContext)
    const gameDispatch = useContext(GameContext).dispatch
    const gameCreatorDispatch = useContext(GameCreatorContext).dispatch

    const {item} = props
    const [game, setGame] = useState({...item})
    const {title, questions, owner, cover, visibility, hiddenByAdmin} = game

    const handleViewDetail = () => {
        gameDispatch(selectGame(game))
        navigate('/game/detail/'+game._id, {replace: false})
    }

    const handleHide = (e) => {
        e.stopPropagation()
        var isHidden = (visibility == 'public') ? true : false
        axios.get('game/hide', {
            headers: {
                'x-access-token': token
            },
            params: {
                _id: game._id,
                isHidden
            }
        }) 
        .then ((res) => {
            console.log("Set hide success:", isHidden)
            setGame({
                ...game,
                visibility: isHidden ? 'private' : 'public',
                hiddenByAdmin: isHidden ? true : false
            })
        })   
        .catch((err) => {
            console.log("Ban user error", err, token, game._id);
        })
    }

    return (
        <div className = {classes.container} style={{backgroundColor: '#fff'}}
            onClick={handleViewDetail}>
            <div className = {classes.left}>
                <img className = {classes.img} 
                    alt = 'Cover'
                    src = {createUrl(cover)}/>
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
                    <VisibilityLabel 
                        visibility = {visibility} 
                        hiddenByAdmin = {hiddenByAdmin}/>
                    
                </div>
                <div className = {classes.rightBottom}>
                    <Typography variant = 'label' sx = {{color: '#000', flex: 1}}>
                        {owner.username}
                    </Typography>
                    {
                        (visibility == 'public' || 
                        (visibility == 'private' && hiddenByAdmin == true)) &&
                        <Button 
                            variant = {visibility == 'private' ? 'success' : 'warning'}
                            size = 'small' 
                            style = {{marginLeft: theme.spacing(2)}}
                            label = {visibility == 'private' ? 'Public' : 'Hide'}
                            onClick = {handleHide}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default GameRowItem