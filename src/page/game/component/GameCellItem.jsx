import { MoreVert } from '@mui/icons-material'
import { Avatar, Grid, Link, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
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
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: 200
    },
    infor: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
}))

export const GameCellItem = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {disableProfileLink} = props
    const handleClickCard = () => {
        navigate('/game/detail', {replace: false})
    }
    return (
        <div className = {classes.container} onClick = {handleClickCard} >
            <img className = {classes.img} src = 'https://vnn-imgs-a1.vgcloud.vn/image-english.vov.vn/h500/uploaded/vn1pm7jlycly8uzveukg/2019_11_28/1_LDJZ.jpg'/>
            <div className = {classes.body}>
                <Avatar alt="Remy Sharp" src="../../../asset/image/logo.jpg" />
                <div className = {classes.infor}>
                    <Typography variant = 'subtitle1'>Game Title</Typography>
                    {
                        disableProfileLink ? 
                        <Typography variant= 'caption'>
                            Game owner
                        </Typography>
                        :
                        <Link href = '/profiles'  underline='hover' onClick={e => e.stopPropagation()}>Game Owner</Link>
                    }
                 
                </div>  
                <MoreVert />
            </div>
        </div>
    )
}
export default GameCellItem
