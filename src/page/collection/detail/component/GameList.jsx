import { Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { GameRowItem } from '../../../game/component/GameRowItem'
import empty_img from '../../../../asset/image/empty.png'
import { theme } from '../../../../theme'
import { useNavigate } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: grey[100],
        display: 'flex',
        flexDirection:'column',
    },
    list: {
        display:'flex',
        flexDirection:'column'
    },
    item: {
        marginBottom: theme.spacing(2),
        display:'flex',
        flexDirection:'column'
    },
    emptyDiv: {
        padding: theme.spacing(8),
        border: '1px dashed #5f5f5f',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyImg: {
        height: 150
    }
}))

const GameList = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {collection} = props
    const {games} = collection
    const handleEdit = () => {
        navigate('/collection/edit/' + collection._id, {replace: false})
    }
    return (
        <div className = {classes.container}>
            {
                games.length == 0?
                <div className = {classes.emptyDiv} >
                    <img className = {classes.emptyImg} src = {empty_img} />
                    <Typography variant= 'subtitle2' sx = {{color: '#5f5f5f', my: theme.spacing(1)}}>
                        Click to <b>Edit</b>  to add more game into this collection.
                    </Typography>
                    <Button variant = 'contained' sx = {{color: 'white', fontWeight: 'bold', textTransform: 'none'}}
                        onClick = {handleEdit}>
                        Edit
                    </Button>
                </div>
                :
                <div className = {classes.list} >
                {
                    games.map((item, index) => (
                        <div className = {classes.item}   key = {''+index}>
                            <GameRowItem game = {item}/>
                        </div>
                    ))
                }
                </div>
            }
       
        </div>
    )
}

export default GameList
