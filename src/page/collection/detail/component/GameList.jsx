import {Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { GameRowItem } from '../../../game/component/GameRowItem'
import empty_img from '../../../../asset/image/empty.png'
import { theme } from '../../../../theme'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../component/Button'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        backgroundColor:  theme.palette.background.main,
        height: '100vh',
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
        height: theme.spacing(20)
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
                    <Typography variant= 'bigLabel' sx = {{color: '#000', mb: theme.spacing(2)}}>
                       Add more games into this collection?
                    </Typography>
                    <Button 
                        variant = 'primary' 
                        size = 'big'
                        label = 'Add games'
                        onClick = {handleEdit}/>
                </div>
                :
                <div className = {classes.list} >

                    <Typography variant = 'btnLabel' sx = {{color: '#000', mb: theme.spacing(1)}}>
                        {`Game(${games ? games.length : 0})`}
                    </Typography>
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
