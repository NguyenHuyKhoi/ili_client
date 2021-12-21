import { MoreVert } from '@mui/icons-material'
import { Avatar, Grid, Link, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import {GameContext} from '../../../context/game/other/context'
import { useNavigate } from 'react-router-dom'
import {createUrl} from '../../../util/helper'
import { selectGame } from '../../../context/game/other/actions'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        backgroundColor:'gray'
    },
    body: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1),
        backgroundColor: 'white',
    },
    img: {
        width: '100%',
        height: 200
    },
    infor: {
        display: 'flex',
        flexDirection: 'column',
        height: 70,
        flex: 1,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
}))

export const GameCellItem = (props) => {
    const navigate = useNavigate()
    const {game} = props 
    const {dispatch} = useContext(GameContext)
    const {title, image, owner} = game
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
            <img className = {classes.img} src = 'https://vnn-imgs-a1.vgcloud.vn/image-english.vov.vn/h500/uploaded/vn1pm7jlycly8uzveukg/2019_11_28/1_LDJZ.jpg'/>
            <div className = {classes.body}>
                <Avatar alt="Remy Sharp" src={createUrl(owner.avatar)} />
                <div className = {classes.infor}>
                    <Typography variant = 'subtitle1' sx = {{color: 'black', fontWeight: 'bold'}}>
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
                        <Link href = ''  underline='hover' onClick={handleViewProfile}>
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
