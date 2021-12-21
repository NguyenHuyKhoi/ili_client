import { Avatar, Button, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../../asset/image/logo.jpg'
import OwnerInfor from '../../../../component/OwnerInfor'
import { startEditGame } from '../../../../context/game/creator/actions'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column'
    },
    gameImg: {
        width: '100%',
        height: 250
    },
    body: {
        flex:1, 
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    btnBar: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(1)
    }
}))
const GameInfor = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {game} = props
    console.log("Game infor :", game)
    const {title, description, cover, owner} = game
    const handleEdit = () => {
        if (props.onEdit) {
            props.onEdit()
        }
    }

    const handlePlay = () => {
        if (props.onPlay) {
            props.onPlay()
        }
    }
    return (
        <div className = {classes.container}>
            <img className = {classes.gameImg} src = {createUrl(cover)}/>
            <div className = {classes.body} >
                <Typography variant = 'h6'>
                    {title}
                </Typography>
                <div className = {classes.btnBar} >
                    <Button variant="contained" color="success"
                        onClick={handlePlay}>
                        Play
                    </Button>
                    <Button variant="contained" color="primary" sx = {{mx: theme.spacing(2)}}
                        onClick={handleEdit}>
                        Edit
                    </Button>
                </div>
                <Typography variant = 'subtitle2' sx = {{my: theme.spacing(2)}}>
                    {description}
                </Typography>
            </div>
            <OwnerInfor owner = {owner}/>
           
        </div>
    )
}

export default GameInfor
