import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import HeaderBar from '../../../component/HeaderBar'
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: grey[300],
        flex: 1,
        height: '100vh'
    }
}))

const GroupListPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {4}/>
        </div>
    )
}

export default GroupListPage
