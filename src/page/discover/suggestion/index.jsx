import { makeStyles } from '@mui/styles'
import React from 'react'
import HeaderBar from '../../../component/HeaderBar'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        height: '100vh'
    },
    body: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    }
}))

const DiscoverPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {1}/>
            <div className= {classes.body}>
            </div>
       
        </div>
    )
}

export default DiscoverPage
