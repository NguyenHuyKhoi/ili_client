import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import IconButton from '../../../../component/IconButton'
import OwnerInfor from '../../../../component/OwnerInfor'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'
import VisibilityLabel from '../../../../component/VisibilityLabel'
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
        marginTop: theme.spacing(1),
    }
}))
const GameInfor = (props) => {
    const classes = useStyles()

    const {game, isMine, isAdmin} = props
    const {title, description, cover, owner, visibility, hiddenByAdmin} = game
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

    const handleDelete = () => {
        if (props.onDelete){
            props.onDelete()
        }
    }

    const handleClone = () => {
        if (props.onClone) {
            props.onClone()
        }
    }

    return (
        <div className = {classes.container}>
            <img className = {classes.gameImg} src = {createUrl(cover)} alt = 'Cover'/>
            <div className = {classes.body} >
                <Typography variant = 'bigLabel' sx = {{ color: 'black', mt: theme.spacing(2)}}>
                    {title}
                </Typography>
                <Typography variant = 'label' sx = {{my: theme.spacing(2)}}>
                    {description === '' || description == null? 'No description...' : description}
                </Typography>
                <VisibilityLabel 
                    visibility = {visibility} 
                    hiddenByAdmin = {hiddenByAdmin}/>
                <div className = {classes.btnBar} >
                    {
                        isMine && 
                        <IconButton icon = 'Edit' variant = 'primary' onClick = {handleEdit}/>
                    }
                    {
                        isAdmin != true &&  
                        <IconButton icon = 'Play' variant = 'success' onClick = {handlePlay}
                            style = {{marginLeft: theme.spacing(3)}}/>
                    }

                    {
                        isMine && 
                        <IconButton icon = 'Clone' variant = 'primary' onClick = {handleClone}
                            style = {{marginLeft: theme.spacing(3)}}/>
                    }
                    {
                        isMine && 
                        <IconButton icon = 'Delete' variant = 'error' onClick = {handleDelete}
                            style = {{marginLeft: theme.spacing(3)}}/>
                    }
                  

                   
                   
                </div>
                <div style= {{marginTop: theme.spacing(2)}}>
                    <OwnerInfor owner = {owner}/>
                </div>
            </div>
           
        </div>
    )
}

export default GameInfor
