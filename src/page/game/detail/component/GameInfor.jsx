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
                <Typography variant = 'h5' sx = {{fontWeight: 'bold', color: 'black'}}>
                    {title}
                </Typography>
                <Typography variant = 'subtitle2' sx = {{my: theme.spacing(2)}}>
                    {description == '' || description == null? 'No description...' : description}
                </Typography>
                <div className = {classes.btnBar} >
                    <Button variant="contained" color="success"
                        onClick={handlePlay}
                        sx = {{color: 'white', fontWeight: 'bold', textTransform: 'none'}}>
                        Play
                    </Button>
                    <Button variant="contained" color="primary" 
                        sx = {{mx: theme.spacing(2),color: 'white', fontWeight: 'bold', textTransform: 'none'}}
                        onClick={handleEdit}>
                        Edit
                    </Button>
                </div>
                <div style= {{marginTop: theme.spacing(2)}}>
                    <OwnerInfor owner = {owner}/>
                </div>
            </div>
           
        </div>
    )
}

export default GameInfor
