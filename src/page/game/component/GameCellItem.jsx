import { MoreVert } from '@mui/icons-material'
import { Avatar, Grid, Link, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import {GameContext} from '../../../context/game/other/context'
import { useNavigate } from 'react-router-dom'
import {createUrl} from '../../../util/helper'
import { selectGame } from '../../../context/game/other/actions'
import { theme } from '../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        borderRadius: theme.spacing(1),
        boxShadow: '1px 3px 6px #5f5f5f'
    },
    body: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1),
        backgroundColor: 'white',
        borderBottomLeftRadius: theme.spacing(1),
        borderBottomRightRadius: theme.spacing(1)
    },
    header: {
        position: 'relative',
        height: 220
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
        opacity: 0.4,
        zIndex: 99
    },
    infor: {
        display: 'flex',
        flexDirection: 'column',
        height: 70,
        flex: 1,
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(2),

    },
}))

export const GameCellItem = (props) => {
    const navigate = useNavigate()
    const {game} = props 
    const {dispatch} = useContext(GameContext)
    const {title, image, owner, questions} = game
    const classes = useStyles()
    const {disableProfileLink} = props
    const handleSelect = () => {
        dispatch(selectGame(game))
        navigate('/game/detail/'+game._id, {replace: false})
    }

    const handleViewProfile = (e) => {
        e.stopPropagation()
        console.log("Game owner :", game.owner)
        navigate('/profiles/'+ game.owner.id, {replace: false})
    }
    return (
        <div className = {classes.container} onClick = {handleSelect} >
            <div className = {classes.header} >
                <img className = {classes.img} src = {createUrl(image)}/>
                <div className= {classes.questionNums} >
                    <Typography variant = 'caption' 
                        sx = {{color: 'white', fontWeight: 'bold'}}> {questions.length} questions </Typography>
                </div>
            </div>
         
            <div className = {classes.body}>
                <Avatar alt="Remy Sharp" src={createUrl(owner.avatar)} sx = {{width: 30, height: 30, mt: theme.spacing(1) }} />
                <div className = {classes.infor}>
                    <Typography variant = 'subtitle1' sx = {{color: '#333333', fontWeight: 'bold'}}>
                        {title}
                    </Typography>
                    {
                        disableProfileLink ? 
                        <Typography variant= 'caption'>
                            {
                                owner.username
                            }
                        </Typography>
                        :
                        <Link href = ''  underline='hover' onClick={handleViewProfile} sx = {{color: '#5f5f5f'}}>
                            {
                                owner.username
                            }
                        </Link>
                    }
                 
                </div>  
                <MoreVert />
            </div>
        </div>
    )
}
export default GameCellItem
