import { makeStyles } from '@mui/styles'
import React from 'react'
import logo from '../../../../asset/image/logo.jpg'
import OwnerInfor from '../../../../component/OwnerInfor'

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
    },
    ownerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ownerInfor: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(1)
    }
}))


const CollectorInfor = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <img className = {classes.gameImg} src = {logo}/>
            <div className = {classes.body} >
                <OwnerInfor/>
            </div>
           
        </div>
    )
}

export default CollectorInfor
