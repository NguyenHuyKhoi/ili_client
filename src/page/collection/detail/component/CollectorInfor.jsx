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
    img: {
        width: '100%',
        height: 250
    },
    body: {
        flex:1, 
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    }
}))


const CollectorInfor = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <img className = {classes.img} src = {logo}/>
            <div className = {classes.body} >
                <OwnerInfor/>
            </div>
           
        </div>
    )
}

export default CollectorInfor
