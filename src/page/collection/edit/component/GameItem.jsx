import { MoreVert, Star } from '@mui/icons-material'
import {Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../component/Button'
import { addGameToCollection, removeGameToCollection } from '../../../../context/collection/actions'
import { CollectionContext } from '../../../../context/collection/context'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'white',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(0.6)
    },
    left: {
        position: 'relative'
    },
    img: {
        height: theme.spacing(12),
        aspectRatio: 1.6
    },
    right: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
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
        backgroundColor: theme.palette.background.main,
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(1.5)
    },
    questionNums: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
        padding: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'black',
        opacity: 0.8,
        zIndex: 99
    }
}))

export const GameItem = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {dispatch} = useContext(CollectionContext)
    const {game, isAdded} = props
    const {title, questions, owner, image} = game
    const handleSelect = () => {
        if (isAdded) {
            dispatch(removeGameToCollection(game))
        }
        else {
            dispatch(addGameToCollection(game))
        }
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.left}>
                <img className = {classes.img} 
                    src = {createUrl(image)}/>
                <div className = {classes.questionNums}>
                    <Typography variant = 'caption' sx = {{color: 'white'}}> 
                        {questions.length} questions 
                    </Typography>
                </div>
            </div>
            <div className = {classes.right}>
                <div className = {classes.rightTop}>
                    <Typography variant = 'btnLabel' sx = {{color: 'black',flex: 1}}> 
                        {title}
                    </Typography>
                    <div >
                        <Button 
                            variant = {isAdded ? 'primary': 'warning'}
                            size = 'small'
                            onClick = {handleSelect}
                            label = { isAdded? 'Added' : 'Add'}/>
                    </div>
                   
                </div>
                <div className = {classes.rightBottom}>
                    <Typography variant = 'label' sx = {{color: '#000', flex: 1}}>
                        {owner.username}
                    </Typography>
                </div>
            </div>
        </div>
    )
}